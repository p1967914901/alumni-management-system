import mockjs, { Random } from 'mockjs';

export default {
  // 使用 mockjs 等三方库
  'GET /activityReg/list': mockjs.mock({
    'status': 1,
    'data|100': [{ username: '@cname',
    'activityId|+1':2 ,

    // 'id': '@id',
    'donationPurpose|1': ['奖学金', '助学金', '基础建设'], 'createTime': "@date('yyyy-MM-dd')", 'donationNum|10000-99999999': 1 }],
  }),

};
