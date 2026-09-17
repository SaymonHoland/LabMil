const STATES = new Set([
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]);

const digits = (value: string) => value.replace(/\D/g, '');

export function formatDocument(value: string): string {
  const normalized = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 14);
  if (!/[A-Z]/.test(normalized) && normalized.length <= 11) {
    return normalized.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/, (_, a, b, c, d) =>
      a + (b ? `.${b}` : '') + (c ? `.${c}` : '') + (d ? `-${d}` : ''));
  }
  const a = normalized.slice(0, 2);
  const b = normalized.slice(2, 5);
  const c = normalized.slice(5, 8);
  const d = normalized.slice(8, 12);
  const e = normalized.slice(12);
  return a + (b ? `.${b}` : '') + (c ? `.${c}` : '') + (d ? `/${d}` : '') + (e ? `-${e}` : '');
}

function validCPF(value: string): boolean {
  if (!/^\d{11}$/.test(value) || /^(\d)\1{10}$/.test(value)) return false;
  for (let length = 9; length <= 10; length++) {
    const sum = value.slice(0, length).split('').reduce((total, digit, i) => total + Number(digit) * (length + 1 - i), 0);
    const check = (sum * 10) % 11 % 10;
    if (check !== Number(value[length])) return false;
  }
  return true;
}

function validCNPJ(value: string): boolean {
  if (!/^[A-Z0-9]{12}\d{2}$/.test(value) || /^(\d)\1{13}$/.test(value)) return false;
  for (let length = 12; length <= 13; length++) {
    const sequence = value.slice(0, length);
    const sum = [...sequence].reverse().reduce((total, character, i) =>
      total + (character.charCodeAt(0) - 48) * (i % 8 + 2), 0);
    const remainder = sum % 11;
    if ((remainder < 2 ? 0 : 11 - remainder) !== Number(value[length])) return false;
  }
  return true;
}

export function validDocument(value: string): boolean {
  const normalized = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return normalized.length === 11 ? validCPF(normalized) : validCNPJ(normalized);
}

export function formatWhatsApp(value: string): string {
  let number = digits(value);
  if (number.length > 11 && number.startsWith('55')) number = number.slice(2);
  number = number.slice(0, 11);
  if (!number) return '';
  const area = number.slice(0, 2);
  const subscriber = number.slice(2);
  return `(${area}${area.length === 2 ? ')' : ''}` +
    (subscriber ? ` ${subscriber.slice(0, subscriber.length > 8 ? 5 : 4)}` : '') +
    (subscriber.length > (subscriber.length > 8 ? 5 : 4) ? `-${subscriber.slice(subscriber.length > 8 ? 5 : 4)}` : '');
}

export function validWhatsApp(value: string): boolean {
  return /^[1-9]\d9\d{8}$/.test(digits(value));
}

export function formatCRMV(value: string): string {
  const input = value.toUpperCase().replace(/^CRMV[\s/-]*/, '').trim();
  const stateFirst = input.match(/^([A-Z]{2})[\s/-]*(\d{1,8})$/);
  if (stateFirst) return `${stateFirst[2]}-${stateFirst[1]}`;
  const normalized = input.replace(/[^A-Z0-9]/g, '');
  const match = normalized.match(/^(\d{0,8})([A-Z]{0,2})/);
  if (!match) return '';
  return match[1] + (match[2] ? `-${match[2]}` : '');
}

export function validCRMV(value: string): boolean {
  const match = value.match(/^(\d{1,8})-([A-Z]{2})$/);
  return !!match && Number(match[1]) > 0 && STATES.has(match[2]);
}
