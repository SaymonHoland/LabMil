import { useState, useEffect } from "react";
import { formatDocument, validDocument, formatWhatsApp, validWhatsApp, formatCRMV, validCRMV } from "./registrationValidation";
import logoBlack from "@/imports/MARCA_LABMIL_VERSAO01-HORIZONTAL.6.png";
import logoWhite from "@/imports/MARCA_LABMIL_VERSAO01-HORIZONTAL.5-1.png";
import camilaPhoto from "@/imports/IMG_0146__1_.jpg.jpeg";
import gabrielPhoto from "@/imports/IMG_0144__1_.jpg.jpeg";
import logoVertical from "@/imports/MARCA_LABMIL_VERSAO01-VERTICAL.2.png";
import logoHeroWhite from "@/imports/MARCA_LABMIL_VERSAO02-HORIZONTAL.7.png";
import aboutPhoto1 from "@/imports/IMG_0042__1_.jpg.jpeg";
import aboutPhoto2 from "@/imports/IMG_0047__1_.jpg.jpeg";
import aboutPhoto3 from "@/imports/IMG_0095__1_.jpg.jpeg";

/* ── Brand tokens ── */
const B = {
  blue: "#0750FC",
  blueDark: "#0440D4",
  blueLight: "#EEF2FF",
  yellow: "#FFCA64",
  yellowDark: "#F5B830",
  purple: "#893FFF",
  bg: "#FFFFFF",
  surface: "#F9F9F9",
  ink: "#0A0A14",
  muted: "#5B6B8A",
  hairline: "#E4E9F5",
  wa: "#25D366",
};

/* ── Shared style primitives ── */
const font = (size: string, weight = 400, color = B.ink) =>
  ({ fontFamily: '"Nunito", system-ui, sans-serif', fontSize: size, fontWeight: weight, color } as React.CSSProperties);

/* ── Icons ── */
function IconWhatsApp({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function IconMenu() {
  return <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>;
}
function IconX() {
  return <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
}
function IconMail() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
}
function IconPin() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
function IconClock() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" /></svg>;
}
function IconInsta() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}
function IconArrow() {
  return <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
}
function IconCheck() {
  return <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
}

/* ── Constants ── */
const WHATSAPP_LINK = "https://wa.me/5585984491305";
const VETCLOUD_REQUEST = "https://app.ideainfo.com.br/exec/requisicao.php?account_id=9z2kzdwd";
const VETCLOUD_RESULT = "https://app.ideainfo.com.br/exec/resultados.php?account_id=9z2kzdwd";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Exames", href: "#exames" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Cadastro", href: "#cadastro" },
  { label: "Contato", href: "#contato" },
];

/* ── Pill label ── */
function SectionLabel({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <div style={{ display: "inline-block", background: dark ? "rgba(255,202,100,0.15)" : B.blueLight, borderRadius: "20px", padding: "4px 14px", marginBottom: "16px" }}>
      <span style={{ ...font("0.72rem", 700, dark ? B.yellow : B.blue), letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
        {children}
      </span>
    </div>
  );
}

/* ── Primary button ── */
function BtnPrimary({ href, children, full = false }: { href: string; children: React.ReactNode; full?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("https://") ? "_blank" : undefined}
      rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: hov ? B.blueDark : B.blue,
        color: "#fff",
        padding: "13px 26px",
        borderRadius: "12px",
        ...font("0.95rem", 700, "#fff"),
        textDecoration: "none",
        transition: "background 0.18s",
        width: full ? "100%" : undefined,
        justifyContent: full ? "center" : undefined,
      }}
    >
      {children}
    </a>
  );
}

/* ── Ghost button ── */
function BtnGhost({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("https://") ? "_blank" : undefined}
      rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: hov ? (light ? "rgba(255,255,255,0.15)" : B.blueLight) : "transparent",
        border: `2px solid ${light ? "rgba(255,255,255,0.45)" : B.hairline}`,
        color: light ? "#fff" : B.ink,
        padding: "11px 24px",
        borderRadius: "12px",
        ...font("0.95rem", 700, light ? "#fff" : B.ink),
        textDecoration: "none",
        transition: "background 0.18s",
      }}
    >
      {children}
    </a>
  );
}

/* ── Navbar ── */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      borderBottom: scrolled ? `1px solid ${B.hairline}` : "1px solid transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "all 0.25s ease",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src={scrolled ? logoBlack : logoWhite}
            alt="LabMil Laboratório Veterinário"
            style={{ height: "36px", width: "auto", objectFit: "contain" }}
          />
        </a>

        <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                ...font("0.875rem", 700, scrolled ? B.ink : "rgba(255,255,255,0.88)"),
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = scrolled ? B.blue : "#fff")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = scrolled ? B.ink : "rgba(255,255,255,0.88)")}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: B.wa, color: "#fff",
              padding: "8px 18px", borderRadius: "10px",
              ...font("0.875rem", 700, "#fff"),
              textDecoration: "none", transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <IconWhatsApp size={16} />
            WhatsApp
          </a>
        </nav>

        <button
          className="nav-mobile-btn"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? B.ink : "#fff", padding: "4px" }}
          aria-label="Menu" aria-expanded={open} aria-controls="mobile-navigation"
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" style={{ background: "#fff", borderTop: `1px solid ${B.hairline}`, padding: "16px 24px 28px" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ display: "block", padding: "13px 0", borderBottom: `1px solid ${B.surface}`, ...font("1rem", 700, B.ink), textDecoration: "none" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              marginTop: "16px", background: B.wa, color: "#fff",
              padding: "13px", borderRadius: "12px",
              ...font("1rem", 700, "#fff"), textDecoration: "none",
            }}
          >
            <IconWhatsApp />
            Falar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section style={{
      position: "relative",
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      overflow: "hidden",
      background: "#051040",
    }}>
      <img
        src="https://images.unsplash.com/photo-1614308459036-779d0dfe51ff?w=1920&h=1080&fit=crop&auto=format"
        alt="Análise microscópica no laboratório LabMil"
        style={{ position: "absolute", inset: 0, width: "120%", height: "120%", objectFit: "cover", opacity: 0.35 }}
      />
      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(7,80,252,0.55) 0%, rgba(5,16,64,0.9) 65%)" }} />
      {/* Yellow accent blob */}
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: "420px", height: "420px", borderRadius: "50%", background: B.yellow, opacity: 0.12, filter: "blur(80px)", pointerEvents: "none" }} />


      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
        {/* Vertical logo as hero brand mark */}
        <div style={{ marginBottom: "20px" }}>
          <img src={logoHeroWhite} alt="LabMil" style={{ height: "220px", width: "auto", objectFit: "contain" }} />
        </div>

        <h1 style={{
          ...font("clamp(2.2rem, 5.5vw, 4rem)", 800, "#fff"),
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          maxWidth: "700px",
          marginBottom: "20px",
        }}>
          Diagnóstico preciso.<br />
          <span style={{ color: B.yellow }}>Resultado ágil.</span>
        </h1>

        <p style={{ ...font("clamp(1rem, 2vw, 1.15rem)", 400, "rgba(255,255,255,0.72)"), maxWidth: "540px", lineHeight: 1.7, marginBottom: "40px" }}>
          Exames laboratoriais para clínicas, hospitais veterinários e
          médicos-veterinários autônomos, com resultados disponíveis online, por e-mail e WhatsApp.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <BtnPrimary href={VETCLOUD_REQUEST}>
            <IconArrow /> Solicitar exame
          </BtnPrimary>
          <BtnGhost href={VETCLOUD_RESULT} light>
            Consultar resultado
          </BtnGhost>
        </div>

        {/* Trust numbers */}
        <div style={{ marginTop: "56px", display: "flex", gap: "0", flexWrap: "wrap" }}>
          {[
            ["Desde 2023", ""],
            ["+20 mil", "exames liberados"],
            ["+500", "veterinários cadastrados"],
          ].map(([n, l], i) => (
            <div key={l} style={{ paddingLeft: i === 0 ? 0 : "28px", marginLeft: i === 0 ? 0 : "28px", borderLeft: i === 0 ? "none" : `2px solid rgba(255,202,100,0.4)` }}>
              <div style={{ ...font("1.6rem", 800, B.yellow), lineHeight: 1 }}>{n}</div>
              <div style={{ ...font("0.75rem", 600, "rgba(255,255,255,0.5)"), marginTop: "3px", letterSpacing: "0.02em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="sobre" style={{ padding: "96px 24px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px", alignItems: "center" }}>
        <div>
          <SectionLabel>Sobre nós</SectionLabel>
          <h2 style={{ ...font("clamp(1.8rem, 4vw, 2.8rem)", 800, B.ink), lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "24px" }}>
            Um laboratório construído para servir quem cuida
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ ...font("0.975rem", 400, B.muted), lineHeight: 1.75 }}>
              O LabMil nasceu da convicção de que um diagnóstico preciso e rápido salva vidas,
              e que os profissionais que cuidam de animais merecem um parceiro laboratorial à altura desse propósito.
            </p>
            <p style={{ ...font("0.975rem", 400, B.muted), lineHeight: 1.75 }}>
              Com controle interno rígido e equipe especializada em medicina veterinária laboratorial,
              entregamos laudos com agilidade sem abrir mão da qualidade científica que cada caso exige.
            </p>
          </div>

          {/* Pillars from brand manual */}
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              ["Dados que facilitam", "Guiados por dados confiáveis, otimizamos processos e tomadas de decisão."],
              ["Parcerias sólidas. ", "A confiança é o pilar do nosso trabalho."],
              ["Cuidado com seriedade", "Atenção e cuidado que guiam cada ação, sempre prontos para atender."],
            ].map(([title, desc]) => (
              <div key={title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, marginTop: "3px", width: "22px", height: "22px", borderRadius: "50%", background: B.blue, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <IconCheck />
                </div>
                <div>
                  <div style={{ ...font("0.9rem", 800, B.ink), marginBottom: "2px" }}>{title}</div>
                  <div style={{ ...font("0.85rem", 400, B.muted), lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div style={{ gridColumn: "1 / -1", borderRadius: "16px", overflow: "hidden", background: B.blueLight, aspectRatio: "16/9" }}>
            <img src={aboutPhoto1} alt="Bancada do laboratório LabMil com microscópio" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ borderRadius: "14px", overflow: "hidden", background: B.blueLight, aspectRatio: "4/3" }}>
            <img src={aboutPhoto2} alt="Técnica realizando coleta com pipeta" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ borderRadius: "14px", overflow: "hidden", background: B.blueLight, aspectRatio: "4/3" }}>
            <img src={aboutPhoto3} alt="Análise em microscópio" style={{ width: "277px", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Exams ── */
const EXAM_GROUPS = [
  { name: "Hematologia", desc: "Análise das células do sangue, hemácias, leucócitos e plaquetas, para avaliação do estado geral do paciente." },
  { name: "Coagulação", desc: "Avaliação do processo de coagulação sanguínea, identificando riscos de hemorragia ou trombose." },
  { name: "Perfis Facilitadores", desc: "Conjuntos de exames agrupados estrategicamente para facilitar diagnósticos específicos com um único pedido." },
  { name: "Bioquímica", desc: "Dosagem de enzimas, proteínas e metabólitos para avaliação da função hepática, renal, pancreática e outros órgãos." },
  { name: "Urologia e Coprologia", desc: "Análise de urina e fezes para diagnóstico de infecções, parasitas, disfunções renais e alterações gastrointestinais." },
  { name: "Dermatologia e Microbiologia", desc: "Diagnóstico de infecções bacterianas, fúngicas e alterações cutâneas por meio de cultura e citologia." },
  { name: "Imunologia e Biologia Molecular", desc: "Detecção de anticorpos e agentes infecciosos por técnicas sorológicas (ELISA) e PCR de alta sensibilidade." },
  { name: "Endocrinologia", desc: "Avaliação hormonal para diagnóstico de hipotireoidismo, hiperadrenocorticismo, diabetes e outras disfunções endócrinas." },
  { name: "Histopatológico e Necropsia", desc: "Análise microscópica de tecidos (biópsias) e exames post-mortem para diagnóstico anatomopatológico." },
];

function Exams() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  function handleClick(i: number) {
    setActiveTooltip(activeTooltip === i ? null : i);
  }

  return (
    <section id="exames" style={{ background: B.surface, padding: "96px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionLabel>Exames</SectionLabel>
        <h2 style={{ ...font("clamp(1.8rem, 4vw, 2.8rem)", 800, B.ink), lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "580px", marginBottom: "48px" }}>
          Amplo portfólio para todas as especialidades
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }} className="exam-grid">
          {EXAM_GROUPS.map(({ name, desc }, i) => {
            const isOpen = activeTooltip === i;
            return (
              <div
                key={name}
                style={{ position: "relative" }}
                onMouseEnter={() => setActiveTooltip(i)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? `exam-description-${i}` : undefined}
                  aria-describedby={isOpen ? `exam-description-${i}` : undefined}
                  onClick={() => handleClick(i)}
                  onKeyDown={(event) => { if (event.key === "Escape") setActiveTooltip(null); }}
                  onBlur={() => setActiveTooltip(null)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "#fff",
                    border: `1.5px solid ${isOpen ? B.blue : B.hairline}`,
                    borderRadius: "12px",
                    padding: "24px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    minHeight: "72px",
                    cursor: "default",
                    transition: "border-color 0.15s",
                    userSelect: "none" as const,
                  }}
                >
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: i % 2 === 0 ? B.blue : B.yellow, flexShrink: 0 }} />
                  <span style={{ ...font("0.95rem", 700, B.ink), lineHeight: 1.35, flex: 1 }}>{name}</span>
                  {/* Info hint */}
                  <span aria-hidden="true" style={{ flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%", background: B.blueLight, display: "flex", alignItems: "center", justifyContent: "center", ...font("0.7rem", 800, B.blue) }}>
                    i
                  </span>
                </button>

                {/* Tooltip */}
                {isOpen && (
                  <div id={`exam-description-${i}`} style={{
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    left: "0",
                    right: "0",
                    background: B.ink,
                    color: "#fff",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    ...font("0.82rem", 500, "#fff"),
                    lineHeight: 1.6,
                    zIndex: 20,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                    pointerEvents: "none",
                  }}>
                    {desc}
                    {/* Arrow */}
                    <span style={{ position: "absolute", bottom: "-6px", left: "24px", width: "12px", height: "12px", background: B.ink, transform: "rotate(45deg)", borderRadius: "2px" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <BtnPrimary href={VETCLOUD_REQUEST}><IconArrow /> Solicitar exame agora</BtnPrimary>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: `2px solid ${B.hairline}`, color: B.ink, padding: "11px 22px", borderRadius: "12px", ...font("0.95rem", 700, B.ink), textDecoration: "none", background: "#fff" }}
          >
            <IconWhatsApp size={16} />
            Dúvidas? Fale conosco
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── How it works ── */
const STEPS = [
  { n: "01", title: "Cadastro", desc: "O cadastro pode ser realizado pelo formulário disponível no nosso site ou pelo WhatsApp." },
  { n: "02", title: "Solicitação", desc: "O preenchimento pode ser feito diretamente pelo nosso sistema ou pela requisição física." },
  { n: "03", title: "Coleta e processamento", desc: "A coleta pode ser solicitada via WhatsApp. O material é recolhido na clínica ou encaminhado ao laboratório. Nossa equipe realiza a triagem e o processamento com equipamentos calibrados e controle de qualidade." },
  { n: "04", title: "Laudo liberado", desc: "Assim que o resultado fica pronto, você recebe uma notificação automática por e-mail e WhatsApp. O laudo fica disponível online em nosso sistema." },
];

function HowItWorks() {
  return (
    <section id="como-funciona" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionLabel>Como funciona</SectionLabel>
        <h2 style={{ ...font("clamp(1.8rem, 4vw, 2.8rem)", 800, B.ink), lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "520px", marginBottom: "56px" }}>
          Do pedido ao laudo em poucos passos
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "2px", background: B.hairline, borderRadius: "16px", overflow: "hidden" }}>
          {STEPS.map((step, i) => (
            <div key={step.n} style={{ background: "#fff", padding: "36px 28px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: B.blueLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <span style={{ ...font("1rem", 800, B.blue) }}>{step.n}</span>
              </div>
              <h3 style={{ ...font("1.05rem", 800, B.ink), marginBottom: "10px", lineHeight: 1.2 }}>{step.title}</h3>
              <p style={{ ...font("0.875rem", 400, B.muted), lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Notification callout */}
        <div style={{
          marginTop: "24px",
          background: `linear-gradient(135deg, ${B.blue} 0%, ${B.blueDark} 100%)`,
          borderRadius: "16px",
          padding: "28px 36px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ ...font("1.1rem", 800, "#fff") }}>
              Resultados disponíveis em nosso sistema, WhatsApp e e-mail
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", flexShrink: 0 }}>
            <a
              href="#cadastro"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: B.yellow, color: B.ink,
                padding: "11px 22px", borderRadius: "10px",
                ...font("0.9rem", 800, B.ink), textDecoration: "none", transition: "opacity 0.18s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Começar agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Team ── */
const TEAM = [
  {
    name: "Camila Roque",
    role: "Médica-veterinária, sócia-proprietária e responsável técnica",
    photo: camilaPhoto as string,
    photoPosition: "center 43%",
    bio: [
      "Médica-veterinária pela UECE (Universidade Estadual do Ceará), com estágios e bolsas voltada para Patologia Clínica e Patologia Geral, e mestre em Medicina Translacional pela UFC (Universidade Federal do Ceará), com subárea em Oncologia. Atua principalmente nas áreas de hematologia, bioquímica, citologia, urinálise e parasitologia.",
    ],
  },
  {
    name: "Gabriel Taumaturgo",
    role: "Médico-veterinário patologista",
    photo: gabrielPhoto as string,
    photoPosition: "center 30%",
    bio: [
      "Médico-veterinário pela UNIFOR (Universidade de Fortaleza), com residência em Anatomia Patológica Veterinária pela UnB (Universidade de Brasília). Atua em diagnóstico anatomopatológico e histopatológico e necropsias de animais domésticos e silvestres.",
    ],
  },
];

function Team() {
  return (
    <section id="equipe" style={{ background: B.bg, padding: "48px 24px 96px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionLabel>Conheça nossa equipe</SectionLabel>
        <h2 style={{ ...font("clamp(1.8rem, 4vw, 2.8rem)", 800, B.ink), lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "48px" }}>
          Os profissionais por trás do LabMil
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {TEAM.map((member) => (
            <div
              key={member.name}
              style={{ background: "#fff", border: `1px solid ${B.hairline}`, borderRadius: "16px", overflow: "hidden" }}
            >
              {/* Photo */}
              <div style={{ height: "280px", background: B.blueLight, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={`Foto de ${member.name}`}
                    style={{ position: "relative", width: "100%", height: "100%", objectFit: "cover", objectPosition: member.photoPosition }}
                  />
                ) : (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="26" r="14" fill={B.hairline} />
                    <ellipse cx="32" cy="56" rx="22" ry="14" fill={B.hairline} />
                  </svg>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "28px 28px 32px" }}>
                <div style={{ ...font("1.15rem", 800, B.ink), marginBottom: "4px" }}>{member.name}</div>
                <div style={{
                  ...font("0.8rem", 700, B.blue),
                  letterSpacing: "0.02em",
                  marginBottom: "20px",
                  paddingBottom: "20px",
                  borderBottom: `1px solid ${B.hairline}`,
                }}>
                  {member.role}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {member.bio.map((p, i) => (
                    <p key={i} style={{ ...font("0.875rem", 400, B.muted), lineHeight: 1.75, margin: 0 }}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  return (
    <section id="contato" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "64px" }}>
        <div>
          <SectionLabel>Contato</SectionLabel>
          <h2 style={{ ...font("clamp(1.8rem, 3.5vw, 2.6rem)", 800, B.ink), lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "20px" }}>
            Estamos aqui para ajudar
          </h2>
          <p style={{ ...font("0.975rem", 400, B.muted), lineHeight: 1.75, marginBottom: "36px" }}>
            Dúvidas sobre exames, laudos ou cadastro? Nossa equipe responde
            rapidamente pelo WhatsApp em horário comercial.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: B.wa, color: "#fff", padding: "14px 28px", borderRadius: "12px",
              ...font("1rem", 800, "#fff"), textDecoration: "none", transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <IconWhatsApp size={22} />
            Falar no WhatsApp
          </a>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            {
              icon: <IconClock />, title: "Horário de atendimento",
              content: (
                <div style={{ ...font("0.875rem", 400, B.muted), lineHeight: 1.7 }}>
                  Segunda a sexta: <strong style={{ color: B.ink }}>08h às 18h</strong><br />
                  Sábado: <strong style={{ color: B.ink }}>08h às 17h</strong><br />
                  <span style={{ fontSize: "0.8rem", color: "#B0BED4" }}>Respostas fora deste horário podem demorar até o próximo dia útil.</span>
                </div>
              ),
            },
            {
              icon: <IconMail />, title: "E-mail",
              content: <a href="mailto:labmilvet@gmail.com" style={{ ...font("0.875rem", 600, B.blue), textDecoration: "none" }}>labmilvet@gmail.com</a>,
            },
            {
              icon: <IconPin />, title: "Endereço",
              content: <div style={{ ...font("0.875rem", 400, B.muted), lineHeight: 1.6 }}>Avenida Rui Barbosa, nº 550<br />Meireles, Fortaleza/CE, CEP 60115-220</div>,
            },
          ].map(({ icon, title, content }, i) => (
            <div key={title} style={{ padding: "24px 0", borderBottom: i < 2 ? `1px solid ${B.hairline}` : "none" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <span style={{ marginTop: "2px", color: B.blue, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ ...font("0.875rem", 800, B.ink), marginBottom: "6px" }}>{title}</div>
                  {content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: B.ink, padding: "56px 24px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "48px", marginBottom: "48px" }}>
          <div>
            <img src={logoWhite} alt="LabMil" style={{ height: "32px", width: "auto", objectFit: "contain" }} />
            <p style={{ ...font("0.8rem", 400, "rgba(255,255,255,0.82)"), lineHeight: 1.7, marginTop: "16px", maxWidth: "210px" }}>
              Laboratório de diagnóstico veterinário comprometido com a precisão e o cuidado.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ color: B.wa, transition: "opacity 0.15s" }} aria-label="WhatsApp"
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              ><IconWhatsApp size={20} /></a>
              <span style={{ color: "rgba(255,255,255,0.4)" }} role="img" aria-label="Instagram indisponível" title="Instagram indisponível"><IconInsta /></span>
            </div>
          </div>

          <div>
            <div style={{ ...font("0.72rem", 800, "rgba(255,255,255,0.7)"), letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "16px" }}>Acesso rápido</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Solicitar exame", href: VETCLOUD_REQUEST },
                { label: "Consultar resultado", href: VETCLOUD_RESULT },
                { label: "Sobre o LabMil", href: "#sobre" },
                { label: "Exames", href: "#exames" },
                { label: "Como funciona", href: "#como-funciona" },
                { label: "Contato", href: "#contato" },
              ].map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("https://") ? "_blank" : undefined} rel={l.href.startsWith("https://") ? "noopener noreferrer" : undefined} style={{ ...font("0.875rem", 600, "rgba(255,255,255,0.88)"), textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = B.yellow)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)")}
                >{l.label}</a>
              ))}
            </nav>
          </div>

          <div>
            <div style={{ ...font("0.72rem", 800, "rgba(255,255,255,0.7)"), letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "16px" }}>Contato</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ ...font("0.875rem", 600, B.wa), textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                <IconWhatsApp size={16} /> (85) 98449-1305
              </a>
              <a href="mailto:labmilvet@gmail.com" style={{ ...font("0.875rem", 400, "rgba(255,255,255,0.88)"), textDecoration: "none" }}>labmilvet@gmail.com</a>
              <span style={{ ...font("0.8rem", 400, "rgba(255,255,255,0.72)") }}>Seg–Sex 08h–18h · Sáb 08h–17h</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <span style={{ ...font("0.75rem", 400, "rgba(255,255,255,0.7)") }}>
            © {year} LabMil Laboratório Veterinário. Todos os direitos reservados.
          </span>
          <span style={{ ...font("0.75rem", 400, "rgba(255,255,255,0.7)"), maxWidth: "480px", textAlign: "right" as const }}>
            Dados pessoais tratados conforme a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).{" "}
            <a href="#politica-de-privacidade" style={{ ...font("0.75rem", 600, "rgba(255,255,255,0.85)"), textDecoration: "underline" }}>
              Política de Privacidade
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── Floating WhatsApp ── */
function FloatWA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      style={{
        position: "fixed", bottom: "24px", right: "24px", zIndex: 100,
        width: "56px", height: "56px", borderRadius: "50%",
        background: B.wa, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        transition: "opacity 0.3s, transform 0.3s",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.7)",
        pointerEvents: visible ? "auto" : "none",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      <IconWhatsApp size={24} />
    </a>
  );
}

/* ── Registration ── */
type FormFields = {
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
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const FIELD_STYLE = (hasError: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "11px 14px",
  borderRadius: "10px",
  border: `1.5px solid ${hasError ? "#E53E3E" : B.hairline}`,
  fontFamily: '"Nunito", system-ui, sans-serif',
  fontSize: "0.9rem",
  fontWeight: 500,
  color: B.ink,
  background: "#fff",
  outline: "none",
  boxSizing: "border-box" as const,
  transition: "border-color 0.15s",
});

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  ...font("0.8rem", 700, B.ink),
  marginBottom: "6px",
  letterSpacing: "0.01em",
};

const ERROR_STYLE: React.CSSProperties = {
  ...font("0.75rem", 600, "#E53E3E"),
  marginTop: "4px",
};

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

const formatCEP = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
};

type CepStatus = "idle" | "loading" | "found" | "not-found" | "unavailable";

type ViaCepResponse = {
  erro?: boolean | "true";
  localidade?: string;
  logradouro?: string;
  uf?: string;
};

function Registration() {
  const [form, setForm] = useState<FormFields>({
    nome: "", clinica: "", veterinario: "", crmv: "", email: "", whatsapp: "",
    tipo: "", documento: "", cep: "", cidade: "", uf: "", rua: "", numero: "",
    receber: "", consentimento: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [cepStatus, setCepStatus] = useState<CepStatus>("idle");

  useEffect(() => {
    const cep = form.cep.replace(/\D/g, "");
    if (cep.length !== 8) return;
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 6000);
    setCepStatus("loading");
    fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Falha na consulta do CEP");
        return response.json() as Promise<ViaCepResponse>;
      })
      .then((address) => {
        if (!active || controller.signal.aborted) return;
        if (address.erro) {
          setCepStatus("not-found");
          setErrors((current) => ({ ...current, cep: "CEP não encontrado. Confira os números." }));
          return;
        }
        if (!address.localidade || !address.uf) throw new Error("Resposta incompleta do CEP");
        setForm((current) => ({
          ...current,
          cidade: address.localidade || current.cidade,
          rua: address.logradouro || current.rua,
          uf: address.uf || "",
        }));
        setErrors((current) => ({ ...current, cep: undefined, cidade: undefined, rua: undefined }));
        setCepStatus("found");
      })
      .catch(() => {
        if (active) setCepStatus("unavailable");
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [form.cep]);

  function set(field: keyof FormFields, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function setCep(value: string) {
    setForm((current) => ({ ...current, cep: formatCEP(value), cidade: "", rua: "", uf: "" }));
    setCepStatus("idle");
    setErrors((current) => ({ ...current, cep: undefined, cidade: undefined, rua: undefined }));
  }

  function setProfile(tipo: string) {
    setForm((f) => ({ ...f, tipo, clinica: "", veterinario: "" }));
    setErrors({});
  }

  const isInstitution = form.tipo === "clinica";
  const canSubmit = !!form.tipo && !!form.nome.trim() && validCRMV(form.crmv)
    && validateEmail(form.email) && validWhatsApp(form.whatsapp) && validDocument(form.documento)
    && form.cep.replace(/\D/g, "").length === 8 && (cepStatus === "found" || cepStatus === "unavailable")
    && !!form.cidade.trim() && !!form.rua.trim() && !!form.numero.trim()
    && !!form.receber && form.consentimento
    && (!isInstitution || (!!form.clinica.trim() && !!form.veterinario.trim()));

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.tipo) e.tipo = "Selecione como você vai se cadastrar.";
    if (!form.nome.trim()) e.nome = isInstitution ? "Informe o nome de quem faz o cadastro." : "Nome do veterinário obrigatório.";
    if (isInstitution && !form.clinica.trim()) e.clinica = "Nome da clínica ou hospital obrigatório.";
    if (isInstitution && !form.veterinario.trim()) e.veterinario = "Nome do veterinário responsável obrigatório.";
    if (!form.crmv.trim()) e.crmv = "Informe o CRMV do veterinário.";
    else if (!validCRMV(form.crmv)) e.crmv = "Informe número e UF válidos, como 12345-CE.";
    if (!form.email.trim()) e.email = "E-mail obrigatório.";
    else if (!validateEmail(form.email)) e.email = "Informe um e-mail válido.";
    if (!form.whatsapp.trim()) e.whatsapp = "WhatsApp obrigatório.";
    else if (!validWhatsApp(form.whatsapp)) e.whatsapp = "Informe um celular com DDD e 9 dígitos.";
    if (!form.documento.trim()) e.documento = "CPF ou CNPJ obrigatório.";
    else if (!validDocument(form.documento)) e.documento = "Informe um CPF ou CNPJ válido.";
    if (form.cep.replace(/\D/g, "").length !== 8) e.cep = "Informe um CEP com 8 dígitos.";
    else if (cepStatus === "not-found") e.cep = "CEP não encontrado. Confira os números.";
    if (!form.cidade.trim()) e.cidade = "Informe a cidade.";
    if (!form.rua.trim()) e.rua = "Informe a rua.";
    if (!form.numero.trim()) e.numero = "Informe o número.";
    if (!form.receber) e.receber = "Selecione onde deseja receber os laudos.";
    if (!form.consentimento) e.consentimento = "É necessário concordar para prosseguir.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      document.getElementById(`cadastro-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    // Prévia: o formulário não transmite dados. Integrar com o serviço de envio antes de ativar cadastros.
    setSubmitted(true);
  }

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = B.blue;
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = B.hairline;
    const field = e.currentTarget.name as keyof FormFields;
    const message = field === "documento" && form.documento && !validDocument(form.documento)
      ? "Informe um CPF ou CNPJ válido."
      : field === "cep" && form.cep && form.cep.replace(/\D/g, "").length !== 8
      ? "Informe um CEP com 8 dígitos."
      : field === "whatsapp" && form.whatsapp && !validWhatsApp(form.whatsapp)
      ? "Informe um celular com DDD e 9 dígitos."
      : field === "crmv" && form.crmv && !validCRMV(form.crmv)
      ? "Informe número e UF válidos, como 12345-CE."
      : field === "email" && form.email && !validateEmail(form.email)
      ? "Informe um e-mail válido." : undefined;
    if (message) setErrors((current) => ({ ...current, [field]: message }));
  };

  return (
    <section id="cadastro" style={{ padding: "96px 24px", background: B.surface, borderTop: `1px solid ${B.hairline}` }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <SectionLabel>Cadastro</SectionLabel>
        <h2 style={{ ...font("clamp(1.8rem, 4vw, 2.8rem)", 800, B.ink), lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "12px" }}>
          Quer se tornar cliente do LabMil?
        </h2>
        <p style={{ ...font("1rem", 400, B.muted), lineHeight: 1.7, marginBottom: "12px", maxWidth: "560px" }}>
          Preencha seus dados para iniciar seu cadastro. Nossa equipe entrará em contato
          para confirmar as informações e concluir o processo.
        </p>
        <p role="note" style={{ ...font("0.875rem", 600, B.muted), lineHeight: 1.6, margin: "0 0 24px" }}>
          Cadastro para veterinários, clínicas e hospitais veterinários.
        </p>
        <p role="note" style={{ ...font("0.875rem", 600, B.muted), lineHeight: 1.6, margin: "0 0 24px" }}>
          Prévia do site: este formulário ainda não envia cadastros. Para solicitar seu cadastro, fale conosco pelo WhatsApp.
        </p>

        {submitted ? (
          <div role="status" aria-live="polite" style={{
            background: "#fff",
            border: `1.5px solid #38A169`,
            borderRadius: "16px",
            padding: "40px 36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "12px",
          }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#F0FFF4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#38A169" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div style={{ ...font("1.2rem", 800, B.ink) }}>Prévia concluída</div>
            <p style={{ ...font("0.95rem", 400, B.muted), lineHeight: 1.7, maxWidth: "440px" }}>
              Nenhum dado foi enviado. O cadastro estará disponível quando o envio for ativado.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ background: "#fff", border: `1px solid ${B.hairline}`, borderRadius: "16px", padding: "36px 32px", display: "flex", flexDirection: "column", gap: "20px" }}>

            <fieldset aria-describedby={errors.tipo ? "cadastro-tipo-error" : undefined} style={{ border: "none", padding: 0, margin: 0 }}>
              <legend style={{ ...LABEL_STYLE, marginBottom: "10px" }}>Como deseja se cadastrar? <span style={{ color: "#E53E3E" }}>*</span></legend>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                {[
                  { value: "autonomo", label: "Veterinário autônomo" },
                  { value: "clinica", label: "Clínica / hospital veterinário" },
                ].map((option, index) => (
                  <label key={option.value} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px", border: `1.5px solid ${form.tipo === option.value ? B.blue : B.hairline}`, borderRadius: "10px", background: form.tipo === option.value ? B.blueLight : "#fff", cursor: "pointer", ...font("0.875rem", 700, B.ink) }}>
                    <input
                      id={index === 0 ? "cadastro-tipo" : undefined}
                      type="radio"
                      name="tipo"
                      value={option.value}
                      checked={form.tipo === option.value}
                      onChange={() => setProfile(option.value)}
                      style={{ accentColor: B.blue, flexShrink: 0 }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {errors.tipo && <div id="cadastro-tipo-error" role="alert" style={ERROR_STYLE}>{errors.tipo}</div>}
            </fieldset>

            {form.tipo && (<>

            {/* Nome */}
            <div>
              <label htmlFor="cadastro-nome" style={LABEL_STYLE}>{isInstitution ? "Nome de quem está fazendo o cadastro" : "Nome do veterinário"} <span style={{ color: "#E53E3E" }}>*</span></label>
              <input
                id="cadastro-nome"
                name="nome"
                required
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "cadastro-nome-error" : undefined}
                type="text"
                value={form.nome}
                onChange={(e) => set("nome", e.target.value)}
                onFocus={inputFocus}
                onBlur={inputBlur}
                placeholder="Nome completo"
                style={FIELD_STYLE(!!errors.nome)}
              />
              {errors.nome && <div id="cadastro-nome-error" role="alert" style={ERROR_STYLE}>{errors.nome}</div>}
            </div>

            {/* Instituição */}
            {isInstitution && <div>
              <label htmlFor="cadastro-clinica" style={LABEL_STYLE}>Nome da clínica ou hospital <span style={{ color: "#E53E3E" }}>*</span></label>
              <input
                id="cadastro-clinica"
                name="clinica"
                type="text"
                required
                aria-invalid={!!errors.clinica}
                aria-describedby={errors.clinica ? "cadastro-clinica-error" : undefined}
                value={form.clinica}
                onChange={(e) => set("clinica", e.target.value)}
                onFocus={inputFocus}
                onBlur={inputBlur}
                placeholder="Nome da clínica ou hospital"
                style={FIELD_STYLE(!!errors.clinica)}
              />
              {errors.clinica && <div id="cadastro-clinica-error" role="alert" style={ERROR_STYLE}>{errors.clinica}</div>}
            </div>}

            {/* Profissional responsável */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              {isInstitution && <div>
                <label htmlFor="cadastro-veterinario" style={LABEL_STYLE}>Nome do veterinário responsável <span style={{ color: "#E53E3E" }}>*</span></label>
                <input
                  id="cadastro-veterinario"
                  name="veterinario"
                  type="text"
                  required
                  aria-invalid={!!errors.veterinario}
                  aria-describedby={errors.veterinario ? "cadastro-veterinario-error" : undefined}
                  value={form.veterinario}
                  onChange={(e) => set("veterinario", e.target.value)}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  placeholder="Nome completo do profissional"
                  style={FIELD_STYLE(!!errors.veterinario)}
                />
                {errors.veterinario && <div id="cadastro-veterinario-error" role="alert" style={ERROR_STYLE}>{errors.veterinario}</div>}
              </div>}
              <div>
                <label htmlFor="cadastro-crmv" style={LABEL_STYLE}>CRMV do responsável (número/UF) <span style={{ color: "#E53E3E" }}>*</span></label>
                <input
                  id="cadastro-crmv"
                  name="crmv"
                  type="text"
                  required
                  aria-invalid={!!errors.crmv}
                  aria-describedby={errors.crmv ? "cadastro-crmv-error" : undefined}
                  value={form.crmv}
                  onChange={(e) => set("crmv", formatCRMV(e.target.value))}
                  maxLength={11}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  placeholder="Ex.: 12345-CE"
                  style={FIELD_STYLE(!!errors.crmv)}
                />
                {errors.crmv && <div id="cadastro-crmv-error" role="alert" style={ERROR_STYLE}>{errors.crmv}</div>}
              </div>
            </div>

            {/* Email + WhatsApp */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div>
                <label htmlFor="cadastro-email" style={LABEL_STYLE}>E-mail <span style={{ color: "#E53E3E" }}>*</span></label>
                <input
                  id="cadastro-email"
                  name="email"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "cadastro-email-error" : undefined}
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  placeholder="seu@email.com"
                  style={FIELD_STYLE(!!errors.email)}
                />
                {errors.email && <div id="cadastro-email-error" role="alert" style={ERROR_STYLE}>{errors.email}</div>}
              </div>
              <div>
                <label htmlFor="cadastro-whatsapp" style={LABEL_STYLE}>WhatsApp <span style={{ color: "#E53E3E" }}>*</span></label>
                <input
                  id="cadastro-whatsapp"
                  name="whatsapp"
                  required
                  aria-invalid={!!errors.whatsapp}
                  aria-describedby={errors.whatsapp ? "cadastro-whatsapp-error" : undefined}
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => set("whatsapp", formatWhatsApp(e.target.value))}
                  maxLength={15}
                  autoComplete="tel"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  placeholder="(00) 00000-0000"
                  style={FIELD_STYLE(!!errors.whatsapp)}
                />
                {errors.whatsapp && <div id="cadastro-whatsapp-error" role="alert" style={ERROR_STYLE}>{errors.whatsapp}</div>}
              </div>
            </div>

            {/* Documento */}
            <div>
                <label htmlFor="cadastro-documento" style={LABEL_STYLE}>CPF ou CNPJ <span style={{ color: "#E53E3E" }}>*</span></label>
                <input
                  id="cadastro-documento"
                  name="documento"
                  required
                  aria-invalid={!!errors.documento}
                  aria-describedby={errors.documento ? "cadastro-documento-error" : undefined}
                  type="text"
                  value={form.documento}
                  onChange={(e) => set("documento", formatDocument(e.target.value))}
                  maxLength={18}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  placeholder="CPF ou CNPJ"
                  style={FIELD_STYLE(!!errors.documento)}
                />
                {errors.documento && <div id="cadastro-documento-error" role="alert" style={ERROR_STYLE}>{errors.documento}</div>}
            </div>

            {/* Endereço */}
            <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <legend style={{ ...LABEL_STYLE, marginBottom: "12px" }}>Endereço</legend>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div>
                  <label htmlFor="cadastro-cep" style={LABEL_STYLE}>CEP <span style={{ color: "#E53E3E" }}>*</span></label>
                  <input id="cadastro-cep" name="cep" type="text" inputMode="numeric" autoComplete="postal-code" required
                    value={form.cep} onChange={(e) => setCep(e.target.value)} maxLength={9}
                    onFocus={inputFocus} onBlur={inputBlur} placeholder="00000-000"
                    aria-invalid={!!errors.cep} aria-describedby={errors.cep ? "cadastro-cep-error" : "cadastro-cep-status"}
                    style={FIELD_STYLE(!!errors.cep)} />
                  {errors.cep && <div id="cadastro-cep-error" role="alert" style={ERROR_STYLE}>{errors.cep}</div>}
                  <div id="cadastro-cep-status" role="status" aria-live="polite" style={{ ...font("0.75rem", 500, B.muted), marginTop: "4px" }}>
                    {cepStatus === "loading" && "Consultando CEP..."}
                    {cepStatus === "found" && `CEP encontrado${form.uf ? ` em ${form.uf}` : ""}. Confirme os dados abaixo.`}
                    {cepStatus === "unavailable" && "Consulta indisponível. Preencha o endereço manualmente e confira o CEP."}
                  </div>
                </div>
                <div>
                  <label htmlFor="cadastro-cidade" style={LABEL_STYLE}>Cidade <span style={{ color: "#E53E3E" }}>*</span></label>
                  <input id="cadastro-cidade" name="cidade" type="text" autoComplete="address-level2" required
                    value={form.cidade} onChange={(e) => set("cidade", e.target.value)}
                    onFocus={inputFocus} onBlur={inputBlur} placeholder="Cidade"
                    aria-invalid={!!errors.cidade} aria-describedby={errors.cidade ? "cadastro-cidade-error" : undefined}
                    style={FIELD_STYLE(!!errors.cidade)} />
                  {errors.cidade && <div id="cadastro-cidade-error" role="alert" style={ERROR_STYLE}>{errors.cidade}</div>}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
                <div>
                  <label htmlFor="cadastro-rua" style={LABEL_STYLE}>Rua <span style={{ color: "#E53E3E" }}>*</span></label>
                  <input id="cadastro-rua" name="rua" type="text" autoComplete="address-line1" required
                    value={form.rua} onChange={(e) => set("rua", e.target.value)}
                    onFocus={inputFocus} onBlur={inputBlur} placeholder="Rua ou avenida"
                    aria-invalid={!!errors.rua} aria-describedby={errors.rua ? "cadastro-rua-error" : undefined}
                    style={FIELD_STYLE(!!errors.rua)} />
                  {errors.rua && <div id="cadastro-rua-error" role="alert" style={ERROR_STYLE}>{errors.rua}</div>}
                </div>
                <div>
                  <label htmlFor="cadastro-numero" style={LABEL_STYLE}>Número <span style={{ color: "#E53E3E" }}>*</span></label>
                  <input id="cadastro-numero" name="numero" type="text" autoComplete="address-line2" required
                    value={form.numero} onChange={(e) => set("numero", e.target.value)} maxLength={15}
                    onFocus={inputFocus} onBlur={inputBlur} placeholder="Nº ou s/n"
                    aria-invalid={!!errors.numero} aria-describedby={errors.numero ? "cadastro-numero-error" : undefined}
                    style={FIELD_STYLE(!!errors.numero)} />
                  {errors.numero && <div id="cadastro-numero-error" role="alert" style={ERROR_STYLE}>{errors.numero}</div>}
                </div>
              </div>
              <p style={{ ...font("0.75rem", 500, B.muted), lineHeight: 1.5, margin: 0 }}>
                A consulta confirma o CEP e sugere cidade e rua; não verifica o número do imóvel.
              </p>
            </fieldset>

            {/* Receber laudos */}
            <div>
              <label htmlFor="cadastro-receber" style={LABEL_STYLE}>Onde deseja receber os laudos? <span style={{ color: "#E53E3E" }}>*</span></label>
              <select
                id="cadastro-receber"
                name="receber"
                required
                aria-invalid={!!errors.receber}
                aria-describedby={errors.receber ? "cadastro-receber-error" : undefined}
                value={form.receber}
                onChange={(e) => set("receber", e.target.value)}
                onFocus={inputFocus}
                onBlur={inputBlur}
                style={{ ...FIELD_STYLE(!!errors.receber), appearance: "auto" as const, color: form.receber ? B.ink : B.muted }}
              >
                <option value="" disabled>Selecione</option>
                <option value="email">E-mail</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="ambos">Ambos</option>
              </select>
              {errors.receber && <div id="cadastro-receber-error" role="alert" style={ERROR_STYLE}>{errors.receber}</div>}
            </div>

            {/* Consentimento */}
            <div>
              <label htmlFor="cadastro-consentimento" style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  id="cadastro-consentimento"
                  required
                  aria-invalid={!!errors.consentimento}
                  aria-describedby={errors.consentimento ? "cadastro-consentimento-error" : undefined}
                  checked={form.consentimento}
                  onChange={(e) => set("consentimento", e.target.checked)}
                  style={{ marginTop: "3px", flexShrink: 0, accentColor: B.blue, width: "16px", height: "16px", cursor: "pointer" }}
                />
                <span style={{ ...font("0.875rem", 500, B.ink), lineHeight: 1.5 }}>
                  Concordo com o envio destes dados ao LabMil para exclusiva realização do meu cadastro e contato.{" "}
                  <a href="#politica-de-privacidade" style={{ ...font("0.875rem", 600, B.blue), textDecoration: "underline" }}>
                    Política de Privacidade
                  </a>
                </span>
              </label>
              {errors.consentimento && <div id="cadastro-consentimento-error" role="alert" style={{ ...ERROR_STYLE, marginTop: "6px" }}>{errors.consentimento}</div>}
            </div>

            {/* Submit */}
            </>)}
            <div style={{ paddingTop: "4px" }}>
              <button
                type="submit"
                disabled={!canSubmit}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: canSubmit ? B.blue : "#AAB6CA",
                  color: "#fff",
                  padding: "13px 28px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  fontFamily: '"Nunito", system-ui, sans-serif',
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  transition: "background 0.18s",
                }}
                onMouseEnter={(e) => { if (canSubmit) e.currentTarget.style.background = B.blueDark; }}
                onMouseLeave={(e) => { if (canSubmit) e.currentTarget.style.background = B.blue; }}
              >
                <IconArrow /> Testar cadastro
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── App ── */
export default function App() {
  return (
    <div style={{ fontFamily: '"Nunito", system-ui, sans-serif' }}>
      <Nav />
      <Hero />
      <About />
      <Team />
      <Exams />
      <HowItWorks />
      <Registration />
      <Contact />
      <Footer />
      <FloatWA />
    </div>
  );
}
