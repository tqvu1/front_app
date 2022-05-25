import { REGEX } from 'src/constants/app';

export const formatPeriodDateTime = (
  dateFrom: string | null,
  dateTo: string | null,
  defaultValue: string = '',
) => {
  if (dateFrom && dateTo) {
    return `${dateFrom} ~ ${dateTo}`;
  }
  return defaultValue;
};

export const mbStrWidth = (input) => {
  let len = 0;
  for (let i = 0; i < input?.length; i++) {
    let code = input.charCodeAt(i);
    if (
      (code >= 0x0020 && code <= 0x1fff) ||
      (code >= 0xff61 && code <= 0xff9f)
    ) {
      len += 1;
    } else if ((code >= 0x2000 && code <= 0xff60) || code >= 0xffa0) {
      len += 2;
    } else {
      len += 0;
    }
  }
  return len;
};

export const isValidPassword = (pwd) => {
  const containsNumber = REGEX.REGEX_NUMBER;
  const containsUpperCase = REGEX.REGEX_UPPER_CASE;
  const containsLowerCase = REGEX.REGEX_LOWER_CASE;
  const containsSymbol = REGEX.REGEX_SPECIAL_CHARACTER;

  let matches = 0;

  if (containsNumber.test(pwd)) {
    matches++;
  }

  if (containsUpperCase.test(pwd)) {
    matches++;
  }

  if (containsLowerCase.test(pwd)) {
    matches++;
  }

  if (containsSymbol.test(pwd)) {
    matches++;
  }

  return pwd && matches >= 2;
};
