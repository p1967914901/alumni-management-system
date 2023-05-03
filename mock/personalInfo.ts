import mockjs, { Random } from 'mockjs';

// 拓展mockjs
Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    return this.pick(phonePrefixs) + mockjs.mock(/\d{8}/) //Number()
  }
});

export default {
  // 使用 mockjs 等三方库
  'GET /user/list': mockjs.mock({
    'status': 1,
    'data': {
      name: '@cname',
      userId: '@id',
      'sex|1': [0, 1],
      'major|1': ['软件工程', '电子商务', '计算机科学与技术', '信息管理与工程'],
      'college|1': ['信息管理与人工智能学院', '财政税务学院', '会计学院', '经济学院', '外国语学院', '人文与传播学院', '创业学院', '公共管理学院', '金融学院', '法学院学院', '数据科学学院', '艺术学院', '马克思学院'],
      'alumniAssociationId': '@id',
      'alumniAssociationName': '@province' + '校友会',
      'phone': '@phone',
      'address': '@county(true)',
      'employer|1': ['阿里', '网易', '百度', '腾讯', '字节'],
      'job|1': ['测试工程师', '前端开发工程师', '产品经理', '后端开发工程师', 'CEO'],
      'email': '@email',
      'isManager|1': [0, 1, 2], // 0-普通用户 1-校友会管理员 2-学校管理员
      'isTutor|1': [0, 1],
      'createTime': '@date("yyyy-MM-dd")',
      'birthday': '@date("yyyy-MM-dd")',
      'password': '123456',
    },
    // 'data|100': [{ name: '@cname', 'id|1-10000': 50, 'type|1': ['奖学金', '助学金', '基础建设'], 'createTime': "@date('yyyy-MM-dd')", 'num|10000-99999999': 1 }],
  }),
  'POST /api/updateUserInfo': (req:any, res:any) => {
    res.send({req, res})
  }

};


