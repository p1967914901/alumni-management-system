import mockjs, { Random } from 'mockjs';

export default {
  // 使用 mockjs 等三方库
  'GET /style/list': mockjs.mock({
    'status': 1,
    'data|100': [{
      'title': '@cname',
      // 'id': '@id',
      'college|1': ['信息管理与人工智能学院', '财政税务学院', '会计学院', '经济学院', '外国语学院', '人文与传播学院', '创业学院', '公共管理学院', '金融学院', '法学院学院', '数据科学学院', '艺术学院', '马克思学院'],
      'age|25-66': 66,
      'sex|1': [0, 1],
      'job|1': ['测试工程师', '前端开发工程师', '产品经理', '后端开发工程师', 'CEO'],
      'isSchoolLevel|1': [0, 1],
      'content': '@cparagraph(20, 30)',
      'image': Random.image('200x100', Random.hex(), Random.hex(), 'png', '照片'),
      'createTime': "@date('yyyy-MM-dd')"
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
