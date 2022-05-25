import React from 'react';
import { createRoot } from 'react-dom/client';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { I18n } from 'src/libs/i18n';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { notification } from 'antd';
import _ from 'lodash';
import history from 'src/libs/history';

import App from './App';
import ScrollToTop from './components/common/ScrollToTop';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      // enabled: true,
      // staleTime: 0,
      // cacheTime: 0,
    },
    mutations: {
      onError(err) {
        const message = _.get(err, 'response.data.errors[0].message', 'Error');
        notification.error({ message });
      },
    },
  },
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <I18nextProvider i18n={I18n}>
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <ScrollToTop />
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  </I18nextProvider>,
);
