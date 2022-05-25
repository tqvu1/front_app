import { useQuery, useQueryClient } from 'react-query';
import { useCallback } from 'react';

const useGlobalState = <T>(key: string, initialValue?: T) => {
  const queryClient = useQueryClient();

  const { data: state } = useQuery(
    key,
    () => queryClient.getQueryData<T>(key),
    {
      initialData: initialValue,
      notifyOnChangeProps: ['data'],
    },
  );

  const setState = useCallback(
    (value: T) => {
      return queryClient.setQueryData<T>(key, value);
    },
    [queryClient],
  );

  return [state, setState] as [T, (v: T) => any];
};

export default useGlobalState;
