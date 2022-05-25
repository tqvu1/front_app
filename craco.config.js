const CracoLessPlugin = require('craco-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  plugins: [
    { plugin: new AntdDayjsWebpackPlugin() },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#ED1C24',
              'border-radius-base': '3px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
