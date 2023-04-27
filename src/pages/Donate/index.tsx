import { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { request } from 'umi';

interface DataItemType {
  key: string;
  name: string;
  num: number;
  createTime: string;
  type: string;
}

const typeToColor = {
  '奖学金': '#2db7f5',
  '助学金': '#f50',
  '基础建设': '#87d068'
}

const columns: ColumnsType<DataItemType> = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: (text) => <Tag color={typeToColor[text as '奖学金']}>{text}</Tag>
  },
  {
    title: '金额',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: '时间',
    key: 'createTime',
    dataIndex: 'createTime',

  },
  {
    title: 'Action',
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
  const [data, setData] = useState<Array<DataItemType>>([]);
  const role = localStorage.getItem('role');
  if (role !== '2') {
    columns.pop();
  }


  useEffect(() => {
    request('/api/getDonateList').then(res => {

      setData(res.data);
    })
  }, []);

  return <Table columns={columns} dataSource={data} />
};
