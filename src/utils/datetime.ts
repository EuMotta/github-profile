import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Mapeamento de meses abreviados em pt-BR para inglês.
 */
const monthMap: Record<string, string> = {
  jan: 'january',
  fev: 'february',
  mar: 'march',
  abr: 'april',
  mai: 'may',
  jun: 'june',
  jul: 'july',
  ago: 'august',
  set: 'september',
  out: 'october',
  nov: 'november',
  dez: 'december',
};

/**
 * Substitui os meses abreviados em pt-BR por seus equivalentes em inglês.
 */
function normalizeMonthToEnglish(input: string): string {
  return input.replace(
    /\b(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\b/gi,
    (match) => monthMap[match.toLowerCase()],
  );
}

/**
 * Formata uma data para o formato pt-BR.
 *
 * @param date - A data a ser formatada.
 * @param options - Configurações de formatação.
 * @returns String da data formatada ou mensagem de erro/undefined.
 */
export function formatDateToPtBR(
  date?: Date | string | null,
  options: {
    includeTime?: boolean;
    formatStyle?: 'extended' | 'short' | 'custom';
  } = {},
): string | undefined {
  if (!date) return undefined;

  const parsedDate = date instanceof Date ? date : new Date(date);

  if (isNaN(parsedDate.getTime())) return 'formato incorreto';

  const { includeTime = true, formatStyle = 'extended' } = options;

  const timePart = includeTime ? ', HH:mm' : '';

  let formatStr = '';

  if (formatStyle === 'custom') {
    formatStr = `MMMM dd, yyyy${includeTime ? ' HH:mm' : ''}`;
  } else if (formatStyle === 'extended') {
    formatStr = `dd 'de' MMM 'de' yyyy${timePart}`;
  } else {
    formatStr = `dd/MM/yyyy${includeTime ? ' HH:mm' : ''}`;
  }

  return format(parsedDate, formatStr, { locale: ptBR });
}

/**
 * Regex para validar datas como "25 de jan 2025, 14:30".
 */
const dateBrRegex =
  /^(\d{1,2})\s(de\s)?(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\s(de\s)?\d{4},?\s?([0-1]?\d|2[0-3]):[0-5]\d?$/i;

/**
 * Valida se a string segue o formato pt-BR esperado.
 */
export function isValidPtBRDateFormat(dateStr: string): boolean {
  return dateBrRegex.test(dateStr.trim());
}

type DateFormatOptions = {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'short' | 'long';
  hour12?: boolean;
};

/**
 * Formata uma data para uma string no formato especificado.
 *
 * @function formatDate
 * @param {string} date - Data a ser formatada.
 * @param {string} [locale='pt-BR'] - Localização para a formatação da data.
 * @param {DateFormatOptions} [options] - Opções de formatação da data.
 * @returns {string} Data formatada ou mensagem de erro.
 *
 * @example
 * // Retorna "25 de jan de 2023"
 * formatDate("2023-01-25 14:30:00");
 *
 * @example
 * // Retorna "25/01/2023"
 * formatDate("25/01/2023");
 *
 * @example
 * // Retorna "25 de janeiro de 2023, 14:30"
 * formatDate("2023-01-25T14:30:00", "pt-BR", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
 */
export default function formatDate(
  date?: string,
  locale = 'pt-BR',
  options: DateFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
) {
  if (!date) return 'Data não disponível';

  try {
    let parsedDate: Date;

    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) {
      const isoDate = date.replace(' ', 'T') + 'Z';
      parsedDate = new Date(isoDate);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      parsedDate = new Date(date + 'T00:00:00Z');
    } else if (!date.includes('T')) {
      const [day, month, year] = date.split('/').map(Number);
      parsedDate = new Date(year, month - 1, day);
    } else {
      parsedDate = new Date(date);
    }

    return parsedDate.toLocaleDateString(locale, options);
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
}
