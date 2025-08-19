import { ReminderTime } from "@/components/ui/transactions/TransactionModal";

export function downloadICSReminder({
  title,
  description,
  startDate,
  endDate,
  reminderTime = ReminderTime.AtTime,
}: {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  reminderTime?: ReminderTime;
}) {
  const pad = (num: number) => String(num).padStart(2, "0");

  const formatDate = (date: Date) => {
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(
      date.getUTCDate()
    )}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
  };

  const dtStart = formatDate(startDate);
  const dtEnd = formatDate(endDate);

  // Lembrete em minutos antes do evento
  const reminderMap: Record<ReminderTime, number> = {
    [ReminderTime.AtTime]: 0,
    [ReminderTime.FifteenMinBefore]: 15,
    [ReminderTime.OneHourBefore]: 60,
    [ReminderTime.OneDayBefore]: 60 * 24,
    [ReminderTime.OneWeekBefore]: 60 * 24 * 7,
  };

  const reminderMinutes = reminderMap[reminderTime];

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CashWise App//EN
BEGIN:VEVENT
UID:${Date.now()}@cashwise.local
DTSTAMP:${dtStart}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:${title}
DESCRIPTION:${description}
BEGIN:VALARM
TRIGGER:-PT${reminderMinutes}M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.replace(/\s+/g, "_")}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
