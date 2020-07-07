const path = require('path');

module.exports = ({
  publicRuntimeConfig: {
    ENV: process.env.ENV || 'dev',
    REACT_APP_ROOT: {
      dev: 'https://app.peelinsights.com/api',
      qa: 'https://app.peelinsights.com/api',
      prod: 'https://app.peelinsights.com/api'
    },
  },
  webpack: (config) => {
    config.resolve.mainFields = ['main', 'browser', 'module']
    config.resolve.alias = {
      ...config.resolve.alias,
      '@actions': path.resolve(__dirname, 'src/redux/actions'),
      '@reducers': path.resolve(__dirname, 'src/redux/reducers'),
      '@store': path.resolve(__dirname, 'src/redux/store'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@util': path.resolve(__dirname, 'src/util'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@display': path.resolve(__dirname, 'src/components/display'),
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    };

    return config;
  },
});
