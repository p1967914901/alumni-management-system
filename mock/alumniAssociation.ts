import mockjs, { Random } from 'mockjs';

export default {
  // 使用 mockjs 等三方库
  'GET /alumni/list': mockjs.mock({
    'status': 1,
    'data|100': [{
      'name': () => Random.cword(3) + '校友会',
      // 'id': '@id',
      'type|1': [0, 1, 2], // 院内、省级、国际
      'createTime': "@date('yyyy-MM-dd')",
      'num|10000-99999999': 1
    }],
  }),

};
