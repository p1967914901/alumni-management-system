import mockjs, { Random } from 'mockjs';

export default {
  // 使用 mockjs 等三方库
  'GET /api/getDonateList': mockjs.mock({
    'status': 1,
    'data|100': [{ name: '@cname', 'id': '@id', 'type|1': ['奖学金', '助学金', '基础建设'], 'createTime': "@date('yyyy-MM-dd')", 'num|10000-99999999': 1 }],
  }),

};
