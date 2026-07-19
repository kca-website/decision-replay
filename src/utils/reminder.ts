// Generate Google Calendar / Outlook links and an RFC 5545-compatible .ics file.

const pad = (n: number) => n.toString().padStart(2, '0');

const dateParts = (ts: number) => {
  const date = new Date(ts);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

const toCompactDate = (ts: number): string => {
  const { year, month, day } = dateParts(ts);
  return `${year}${pad(month)}${pad(day)}`;
};

const addCalendarDay = (ts: number): number => {
  const date = new Date(ts);
  date.setDate(date.getDate() + 1);
  return date.getTime();
};

const escapeICS = (value: string): string => value
  .replace(/\\/g, '\\\\')
  .replace(/\n/g, '\\n')
  .replace(/,/g, '\\,')
  .replace(/;/g, '\\;');

export const buildGoogleCalendarUrl = (
  title: string,
  replayDate: number,
  appUrl: string,
  decisionId: string
): string => {
  const start = toCompactDate(replayDate);
  const end = toCompactDate(addCalendarDay(replayDate));
  const details = `Review the decision you locked earlier.\n\nOpen Decision Replay: ${appUrl}/app/decisions/${decisionId}/replay`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Decision Replay: ${title}`,
    dates: `${start}/${end}`,
    details,
    trp: 'false',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const buildOutlookCalendarUrl = (
  title: string,
  replayDate: number,
  appUrl: string,
  decisionId: string
): string => {
  const date = new Date(replayDate);
  const startdt = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T09:00:00`;
  const enddt = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T09:30:00`;
  const body = `Review the decision you locked earlier: ${appUrl}/app/decisions/${decisionId}/replay`;
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: `Decision Replay: ${title}`,
    startdt,
    enddt,
    body,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

export const downloadICS = (
  title: string,
  replayDate: number,
  appUrl: string,
  decisionId: string
): void => {
  const uid = `dr-${decisionId}@decision-replay`;
  const start = toCompactDate(replayDate);
  const end = toCompactDate(addCalendarDay(replayDate));
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const url = `${appUrl}/app/decisions/${decisionId}/replay`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'PRODID:-//Decision Replay//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${escapeICS(`Decision Replay: ${title}`)}`,
    `DESCRIPTION:${escapeICS(`Review the decision you locked earlier.\nOpen: ${url}`)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT9H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Decision Replay reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = `decision-replay-${decisionId.slice(0, 8)}.ics`;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
};
