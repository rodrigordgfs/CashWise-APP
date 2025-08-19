import { ReminderTime } from "@/components/ui/transactions/TransactionModal";
import {
  parseISO,
  subMinutes,
  subHours,
  addMinutes,
  format,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from "date-fns";
import { flow } from "lodash";

export function getEventTimeRange(date: string, reminderTime: ReminderTime) {
  const base = flow(
    (dateStr: string) => parseISO(dateStr),
    (d: Date) => setHours(d, 12),
    (d: Date) => setMinutes(d, 0),
    (d: Date) => setSeconds(d, 0),
    (d: Date) => setMilliseconds(d, 0)
  )(date);

  let start = base;

  switch (reminderTime) {
    case ReminderTime.FifteenMinBefore:
      start = subMinutes(base, 15);
      break;
    case ReminderTime.OneHourBefore:
      start = subHours(base, 1);
      break;
    case ReminderTime.OneDayBefore:
      start = subHours(base, 24);
      break;
    case ReminderTime.OneWeekBefore:
      start = subHours(base, 24 * 7);
      break;
    case ReminderTime.AtTime:
    default:
      start = base;
      break;
  }

  const end = addMinutes(start, 30); // duração padrão de 30 min

  const formatDate = (d: Date) => format(d, "yyyyMMdd'T'HHmmss'Z'"); // UTC format

  return {
    start: formatDate(start),
    end: formatDate(end),
  };
}
