import qs from 'query-string';
import { useLocation } from 'react-router-dom';

const useQueryUrl = <T = Record<string, any>>() => {
  const location = useLocation();
  const search = qs.parse(location.search, {
    parseBooleans: true,
    arrayFormatSeparator: '|',
    arrayFormat: 'bracket-separator',
  }) as unknown;
  return search as T;
};

export default useQueryUrl;
