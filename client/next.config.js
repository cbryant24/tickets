module.exorts = {
  webpackDevMiddleware: () => {
    config.watch.options = 300;
    return config;
  }
}