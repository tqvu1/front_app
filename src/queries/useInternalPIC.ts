import { useQuery, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import internalPIC from 'src/repositories/internalPIC';

const useInternalPIC = ({ search }: SearchParams.InternalPIC) => {
  const apiPath = 'internalpic/initialization-info-popup';
  const queryClient = useQueryClient();

  const queryInternalPICList = useQuery<
    AxiosResponse<Response.InternalPIC>,
    AxiosError<Response.Error>
  >({
    queryKey: [
      apiPath,
      { screenId: 'R1512', ryuthanbsCd: '1', kokyakuCd: '1' },
    ],
    queryFn: internalPIC.getInternalPIC,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.removeQueries({
          queryKey: [apiPath, { search }],
        });
      });
    },
  });

  return { queryInternalPICList };
};

export default useInternalPIC;
