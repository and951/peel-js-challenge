export default () => () => ({
    publicRuntimeConfig: {
    ENV: 'test',
    REACT_APP_ROOT: {
      test: 'https://app.peelinsights.com/api',
    },
    }
  })
