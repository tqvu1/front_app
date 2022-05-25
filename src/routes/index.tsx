import { RouteObject } from 'react-router-dom';

const modulesRoute = () => {
  const requireModule = require.context('./modules', true, /\.tsx$/);
  const modules: RouteObject[] = [];

  requireModule.keys().forEach((fileName) => {
    const module = requireModule(fileName).default;
    modules.push(...module);
  });

  return modules;
};

const modulesRoutes: RouteObject[] = [...modulesRoute()];

export default modulesRoutes;
