// Generate Google Calendar event URL and .ics file for replay reminders

const pad = (n: number) => n.toString().padStart(2, '0');

const toGCalDate = (ts: number): string => {
  const d = new Date(ts);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
};

const toICSDate = (ts: number): string => {
  const d = new Date(ts);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T090000`;
};

export const buildGoogleCalendarUrl = (
  title: string,
  replayDate: number,
  appUrl: string,
  decisionId: string
): string => {
  const date = toGCalDate(replayDate);
  const details = `Time to replay your decision!\n\nOpen Decision Replay: ${appUrl}/app/decisions/${decisionId}/replay`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `🔄 Replay: ${title}`,
    dates: `${date}/${date}`,
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
  const d = new Date(replayDate);
  const startdt = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T09:00:00`;
  const enddt = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T09:30:00`;
  const body = `Time to replay your decision! Open: ${appUrl}/app/decisions/${decisionId}/replay`;
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: `🔄 Replay: ${title}`,
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
  const dtstart = toICSDate(replayDate);
  const now = toICSDate(Date.now());
  const url = `${appUrl}/app/decisions/${decisionId}/replay`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Decision Replay//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtstart}`,
    `SUMMARY:🔄 Replay: ${title}`,
    `DESCRIPTION:Time to replay your decision!\\nOpen: ${url}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Decision Replay reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `replay-${decisionId.slice(0, 8)}.ics`;
  a.click();
  URL.revokeObjectURL(a.href);
};
