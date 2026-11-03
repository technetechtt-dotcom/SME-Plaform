export function formatCurrency(amount: number): string {
  if (amount >= 1000000) return `R${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `R${Math.round(amount / 1000)}k`;
  return `R${amount}`;
}

export function formatDate(value: string): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function formatDateTime(value: string): string {
  if (!value) return '—';
  return new Date(value).toLocaleString('en-ZA', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export function addDaysISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function initials(name: string): string {
  return name.
  split(' ').
  filter(Boolean).
  slice(0, 2).
  map((part) => part[0]).
  join('').
  toUpperCase();
}