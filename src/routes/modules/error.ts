import Error, { PATH } from 'src/pages/error';

const routes: App.RouteFnc = () => [
  {
    path: PATH.NOT_FOUND,
    exact: true,
    requiredAuth: false,
    element: Error.NotFound,
  },
  {
    path: PATH.INTERNAL_SERVER,
    exact: true,
    requiredAuth: false,
    element: Error.InternalServer,
  },
  {
    path: PATH.FORBIDDEN,
    exact: true,
    requiredAuth: false,
    element: Error.Forbidden,
  },
  {
    path: '*',
    element: Error.NotFound,
  },
];

export default routes;
