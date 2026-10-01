type EmailMessageBuilder = {
  to: string;
  from: string | { email: string; name?: string };
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
};

type Env = {
  EMAIL: { send(message: EmailMessageBuilder): Promise<{ messageId: string }> };
  ASSETS: { fetch(request: Request): Promise<Response> };
  REGISTRATION_RATE_LIMITER: { limit(options: { key: string }): Promise<{ success: boolean }> };
  TURNSTILE_SECRET: string;
};

type Registration = {
  nome: string;
  clinica: string;
  veterinario: string;
  crmv: string;
  email: string;
  whatsapp: string;
  tipo: string;
  documento: string;
  cep: string;
  cidade: string;
  uf: string;
  rua: string;
  numero: string;
  receber: string;
  consentimento: boolean;
  website?: string;
  turnstileToken: string;
};

const RECIPIENT = "labmilvet@gmail.com";
const ALLOWED_HOSTS = new Set(["labmilvet.com.br", "www.labmilvet.com.br"]);

const json = (body: object, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  },
});

const clean = (value: unknown, max = 160) =>
  typeof value === "string" ? value.trim().replace(/[\u0000-\u001F\u007F]/g, " ").slice(0, max) : "";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
}[character] as string));

function parseRegistration(value: unknown): Registration | null {
  if (!value || typeof value !== "object") return null;
  const source = value as Record<string, unknown>;
  const registration: Registration = {
    nome: clean(source.nome),
    clinica: clean(source.clinica),
    veterinario: clean(source.veterinario),
    crmv: clean(source.crmv, 20),
    email: clean(source.email, 254).toLowerCase(),
    whatsapp: clean(source.whatsapp, 30),
    tipo: clean(source.tipo, 20),
    documento: clean(source.documento, 24),
    cep: clean(source.cep, 12),
    cidade: clean(source.cidade),
    uf: clean(source.uf, 2).toUpperCase(),
    rua: clean(source.rua),
    numero: clean(source.numero, 20),
    receber: clean(source.receber, 20),
    consentimento: source.consentimento === true,
    website: clean(source.website),
    turnstileToken: clean(source.turnstileToken, 2048),
  };
  const institution = registration.tipo === "clinica";
  const valid = ["clinica", "autonomo"].includes(registration.tipo)
    && registration.nome.length >= 2
    && (!institution || (registration.clinica.length >= 2 && registration.veterinario.length >= 2))
    && /^\d{1,6}-[A-Z]{2}$/.test(registration.crmv)
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)
    && registration.whatsapp.replace(/\D/g, "").length === 11
    && [11, 14].includes(registration.documento.replace(/\D/g, "").length)
    && registration.cep.replace(/\D/g, "").length === 8
    && registration.cidade.length >= 2
    && registration.rua.length >= 2
    && registration.numero.length >= 1
    && ["email", "whatsapp", "ambos"].includes(registration.receber)
    && registration.consentimento;
  return valid ? registration : null;
}

async function verifyTurnstile(token: string, secret: string, remoteIp: string) {
  if (!token || !secret) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!response.ok) return false;
  const result = await response.json() as { success?: boolean; action?: string; hostname?: string };
  return result.success === true && result.action === "cadastro" && !!result.hostname && ALLOWED_HOSTS.has(result.hostname);
}

async function rateLimitKey(request: Request, data: Registration) {
  const identifier = `${request.headers.get("CF-Connecting-IP") || "unknown"}:${data.email}:${data.documento.replace(/\D/g, "")}`;
  const bytes = new TextEncoder().encode(identifier);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function buildEmail(data: Registration) {
  const profile = data.tipo === "clinica" ? "Clínica / hospital veterinário" : "Veterinário autônomo";
  const rows: Array<[string, string]> = [
    ["Tipo de cadastro", profile],
    ["Nome", data.nome],
    ...(data.tipo === "clinica" ? [["Clínica / hospital", data.clinica], ["Veterinário responsável", data.veterinario]] as Array<[string, string]> : []),
    ["CRMV", data.crmv],
    ["E-mail", data.email],
    ["WhatsApp", data.whatsapp],
    ["CPF / CNPJ", data.documento],
    ["Endereço", `${data.rua}, ${data.numero} — ${data.cidade}/${data.uf} — CEP ${data.cep}`],
    ["Receber laudos por", data.receber === "ambos" ? "E-mail e WhatsApp" : data.receber === "email" ? "E-mail" : "WhatsApp"],
  ];
  return {
    subject: `Novo cadastro pelo site — ${data.nome}`,
    text: ["Novo pedido de cadastro recebido pelo site do LabMil", "", ...rows.map(([label, value]) => `${label}: ${value}`)].join("\n"),
    html: `<h2>Novo pedido de cadastro</h2><table style="border-collapse:collapse">${rows.map(([label, value]) => `<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`).join("")}</table>`,
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/cadastro") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
    const origin = request.headers.get("Origin");
    if (!origin || !ALLOWED_HOSTS.has(new URL(origin).hostname)) return json({ error: "Origem não permitida." }, 403);
    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) return json({ error: "Formato inválido." }, 415);
    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 16_384) return json({ error: "Dados muito grandes." }, 413);
    try {
      const payload = await request.json();
      if ((payload as { website?: unknown })?.website) return json({ success: true });
      const registration = parseRegistration(payload);
      if (!registration) return json({ error: "Confira os campos obrigatórios." }, 400);
      const remoteIp = request.headers.get("CF-Connecting-IP") || "";
      if (!await verifyTurnstile(registration.turnstileToken, env.TURNSTILE_SECRET, remoteIp)) {
        return json({ error: "A verificação de segurança expirou ou não foi concluída. Tente novamente." }, 400);
      }
      const rateLimit = await env.REGISTRATION_RATE_LIMITER.limit({ key: await rateLimitKey(request, registration) });
      if (!rateLimit.success) {
        return new Response(JSON.stringify({ error: "Muitas tentativas em pouco tempo. Aguarde um minuto e tente novamente." }), {
          status: 429,
          headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "Retry-After": "60", "X-Content-Type-Options": "nosniff" },
        });
      }
      const message = buildEmail(registration);
      await env.EMAIL.send({
        to: RECIPIENT,
        from: { email: "cadastro@labmilvet.com.br", name: "Site LabMil" },
        replyTo: registration.email,
        ...message,
      });
      return json({ success: true });
    } catch (error) {
      console.error("Falha ao enviar cadastro", error);
      return json({ error: "Não foi possível enviar agora. Tente novamente em instantes." }, 500);
    }
  },
};
