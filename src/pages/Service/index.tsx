import { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { request } from 'umi';

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

const columns: ColumnsType<UserInfoType> = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    key: 'birthday',
    // render: (text) => <Tag color={typeToColor[text as '奖学金']}>{text}</Tag>
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: '专业',
    key: 'major',
    dataIndex: 'major',

  },
  {
    title: '学院',
    dataIndex: 'college',
    key: 'college',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
    // render: (text) => <Tag color={typeToColor[text as '奖学金']}>{text}</Tag>
  },
  {
    title: '联系地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '就业单位',
    key: 'employer',
    dataIndex: 'employer',

  },
  {
    title: '职业',
    key: 'job',
    dataIndex: 'job',

  },
  {
    title: '邮箱',
    key: 'email',
    dataIndex: 'email',

  },
  {
    title: '是否担任管理员',
    key: 'isManager',
    dataIndex: 'isManager',

  },
  {
    title: '是否担任导师',
    key: 'isTutor',
    dataIndex: 'isTutor',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={
          () => {
            console.log((record as any).id)
          }
        }>删除</a>
      </Space>
    ),
  },
];


export default () => {
  const [data, setData] = useState<Array<UserInfoType>>([]);
  const role = localStorage.getItem('role');
  if (role !== '2') {
    columns.pop();
  }


  useEffect(() => {
    request('/api/getUserInfoList').then(res => {

      setData(res.data);
    })
  }, []);

  return <Table columns={columns} dataSource={data} scroll={{ y: 540 }}/>
};
