import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  '@utils': `${__dirname}/utils`,
  '@middlewares': `${__dirname}/middlewares`,
  '@services': `${__dirname}/services`,
  '@api': `${__dirname}/api`,
  '@interfaces': `${__dirname}/interfaces`,
  '@entities': `${__dirname}/entities`,
  '@config': `${__dirname}/config`,
  '@schemas': `${__dirname}/schemas`,
});
