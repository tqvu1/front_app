import dayjs, { ConfigType } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export default (date?: ConfigType, format?: string, strict?: boolean) =>
  dayjs.utc(date, format, strict).tz('Asia/Seoul');
