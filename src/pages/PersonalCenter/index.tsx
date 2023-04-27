import { ProDescriptions } from '@ant-design/pro-components';
import { Select } from 'antd';
import { useState, useEffect } from 'react';
import request from 'umi-request';


interface UserInfoType {
  name: string,
  userId: string,
  birthday: string,
  sex: number,
  major: string,
  college: string,
  alumniAssociationId: string,
  phone: string,
  address: string,
  employer: string,
  job: string,
  email: string,
  isManager: number,
  isTutor: number,
  createTime: string
}

export default () => {

  const [data, setData] = useState<UserInfoType>({
    name: '',
    userId: '',
    birthday: '2001-01-01',
    sex: 0,
    major: '',
    college: '',
    alumniAssociationId: '',
    phone: '',
    address: '',
    employer: '',
    job: '',
    email: '',
    isManager: 0,
    isTutor: 0,
    createTime: ''
  });
  // const [columns, setColumns] = useState([]);

  useEffect(() => {
    request.get('/api/getUserInfo').then(res => {
      setData(res.data);
    });
    // request.post('/api/updateUserInfo').then(res => {
    //   console.log(res)
    // })
  }, []);


  // function getColumsData(data:UserInfoType) {
  //   const columns:any = [];
  //   const hide = ['alumniAssociationId', 'id']
  //   const notEditable = ['isManager']

  //   for(const key in data) {
  //     if (hide.includes(key)) {
  //       continue;
  //     }
  //     columns.push({
  //       title: '名字',
  //       key: 'name',
  //       dataIndex: 'name',
  //       copyable: false,
  //       ellipsis: true,
  //     })
  //   }

  //   return columns;
  // }

  return (
    <ProDescriptions
      bordered
      dataSource={data}
      editable={{
        onSave: (key, record) => {
          return new Promise((resolve) => {
            console.log(key, record);
            resolve(1);
          })
        }
      }}
      columns={[
        {
          title: '名字',
          key: 'name',
          dataIndex: 'name',
          copyable: false,
          ellipsis: true,
        },
        {
          title: '学号',
          key: 'userId',
          dataIndex: 'userId',
          copyable: true,
          editable: false,
        },
        {
          title: '出生日期',
          key: 'birthday',
          dataIndex: 'birthday',
          valueType: 'date',
        },
        {
          title: '性别',
          key: 'sex',
          dataIndex: 'sex',
          copyable: false,
          renderText: (text) => (text === 1 ? '男' : '女'),
          renderFormItem: () => {
            return <Select options={[
              { value: 1, label: '男' },
              { value: 0, label: '女' },
            ]} />
          }
        },
        {
          title: '专业',
          key: 'major',
          dataIndex: 'major',
          copyable: false,
        },
        {
          title: '学院',
          key: 'college',
          dataIndex: 'college',
          renderFormItem: () => {
            return <Select options={[
              '信息管理与人工智能学院', '财政税务学院', '会计学院', '经济学院', '外国语学院', '人文与传播学院',
              '创业学院', '公共管理学院', '金融学院', '法学院学院', '数据科学学院', '艺术学院', '马克思学院'
            ].map((v:string) => ({value:v, label: v}))} />
          }
        },
        {
          title: '联系电话',
          key: 'phone',
          dataIndex: 'phone',
          copyable: true,
        },
        {
          title: '地址',
          key: 'address',
          dataIndex: 'address',
          copyable: true,
        },
        {
          title: '工作单位',
          key: 'employer',
          dataIndex: 'employer',
        },
        {
          title: '职业',
          key: 'job',
          dataIndex: 'job',
        },{
          title: '邮箱',
          key: 'email',
          dataIndex: 'email',
          copyable: true,
        },{
          title: '权限',
          key: 'isManager',
          dataIndex: 'isManager',
          editable: false,
          renderText: (text) => (text === 0 ? '校友' : (text === 1 ? '学校管理员' : '校友会管理员')),
        },{
          title: '是否兼职导师',
          key: 'isTutor',
          dataIndex: 'isTutor',
          editable: false,
          renderText: (text) => (text === 0 ? '否' : '是'),
        },{
          title: '注册时间',
          key: 'createTime',
          dataIndex: 'createTime',
          editable: false,
        }
      ]}

    >
    </ProDescriptions>
  );
};
