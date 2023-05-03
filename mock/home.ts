import mockjs, { Random } from 'mockjs';

export default {
  // 使用 mockjs 等三方库
  'GET /news/list': mockjs.mock({
    'status': 1,
    'data|100': [{
      'id': '@id',
      'headlines': '@ctitle',
      'content': '@cparagraph(5, 10)',
      'createTime': '@date("yyyy-MM-dd")',
      'tag|1': ['文化校园', '学术科研', '创新创业大赛']
    }],
  }),

};

// {
//   title: '语雀的天空',
//   college: '信息管理与人工智能学院',
//   age: 36,
//   sex: '男',
//   job: '阿里总裁',
//   content: '',
//   isSchoolLevel: 1,
// },
