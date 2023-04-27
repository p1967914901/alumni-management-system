import { defineConfig } from 'umi';
// import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  favicon: '@/static/logo.png',
  // routes,
  fastRefresh: {},

});
