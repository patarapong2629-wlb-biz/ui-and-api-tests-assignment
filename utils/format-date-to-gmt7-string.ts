const findFormatPart = (
  parts: Intl.DateTimeFormatPart[],
  part: 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second'
) => parts?.find((p) => p.type === part)?.value ?? '';

export const formatDateToGMT7String = (date: Date) => {
  const TWO_DIGIT = '2-digit';
  const options: Intl.DateTimeFormatOptions = {
    day: TWO_DIGIT,
    month: TWO_DIGIT,
    year: 'numeric',
    hour: TWO_DIGIT,
    minute: TWO_DIGIT,
    second: TWO_DIGIT,
    timeZone: 'Asia/Bangkok',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);

  const day = findFormatPart(parts, 'day');
  const month = findFormatPart(parts, 'month');
  const year = findFormatPart(parts, 'year');
  const hour = findFormatPart(parts, 'hour');
  const minute = findFormatPart(parts, 'minute');
  const second = findFormatPart(parts, 'second');

  return `${year}-${month}-${day}-T${hour}:${minute}:${second}`;
};
