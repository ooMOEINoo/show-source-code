import servers from './server';
import tags from './tags';
import paths from './paths';
import components from './components';

export default {
  openapi: '3.0.3',
  info: {
    title: 'Talkent',
    description: 'Talkent open API',
    version: '1.0.0',
    contact: {
      name: 'moein zahmati',
    },
  },
  servers,
  tags,
  paths,
  components,
};
