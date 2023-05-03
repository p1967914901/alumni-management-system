import mockjs, { Random } from 'mockjs';

// 生成未来30天内的时间
function getRandomDate(start = 0, num = 30) {
  let now = new Date(); // 当前时间
  now = new Date(now.getTime() + start * 24 * 60 * 60 * 1000); //
  const max = new Date(now.getTime() + num * 24 * 60 * 60 * 1000); // 未来30天内的最大时间
  const randomTime = Math.random() * (max.getTime() - now.getTime()) + now.getTime(); // 随机生成一个时间戳
  const randomDate = new Date(randomTime); // 转换为日期对象
  const year = randomDate.getFullYear(); // 年份
  const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // 月份，注意要补零
  const day = String(randomDate.getDate()).padStart(2, '0'); // 日，注意要补零
  return `${year}-${month}-${day}`; // 返回格式化后的日期字符串
}

// 测试
console.log(getRandomDate()); // 输出类似于 "2022-11-13" 的日期字符串


export default {
  // 使用 mockjs 等三方库
  'GET /activity/list': mockjs.mock({
    'status': 1,
    'data|100': [{
      // 'id': '@id',
      'title': '@ctitle',
      'address': '@county(true)',
      'num|100-500': 1,
      'activityDetail': '@cparagraph(20, 30)',
      'endTime': () => getRandomDate(15, 30),
      'fee|10000-1000000': 1,
      'createTime': () => getRandomDate(3),
      'time': () => getRandomDate(30, 60),
      'remainder|10-100': 1,
      'initiator': '@cname',
      'isRelease|1': [0, 1],
    }],
  }),

};

// interface ActivityItemType {
//   id: string;
//   title: string,
//   address: string,
//   num: number,
//   activityDetail: string,
//   endTime: string,
//   fee: number,
//   createTime: string,
//   time: string,
//   remainder: number;
//   initiator: string, // 发起人名字
//   isRelease: number; // 是否发布
// }
