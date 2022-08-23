import config from '@config/default';

const { port, prefixApi } = config.app;

export default [
    {
      url: `http://localhost:${port}${prefixApi}`,
      description: 'local server',
    },
];
