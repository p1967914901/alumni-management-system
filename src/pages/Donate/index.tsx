import { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, message, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from '../../utils/axios';
import { ExclamationCircleFilled } from '@ant-design/icons';

interface DataItemType {
  id: number,
  activityId: number;
  userId: number;
  username: string;
  donationNum: number;
  createTime: string;
  donationPurpose: string;
}

const typeToColor = {
  '奖学金': '#2db7f5',
  '助学金': '#f50',
  '基础建设': '#87d068'
}


const { confirm } = Modal;

export default () => {
  const [data, setData] = useState<Array<DataItemType>>([]);


  const columns: ColumnsType<DataItemType> = [
    {
      title: '名字',
      dataIndex: 'username',
      key: 'username',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '类型',
      dataIndex: 'donationPurpose',
      key: 'donationPurpose',
      render: (text) => <Tag color={typeToColor[text as '奖学金']}>{text}</Tag>
    },
    {
      title: '金额',
      dataIndex: 'donationNum',
      key: 'donationNum',
    },
    {
      title: '时间',
      key: 'createTime',
      dataIndex: 'createTime',

    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={
            () => {
              // console.log((record as any))
              confirm({
                title: '您确认要删除此记录吗？',
                icon: <ExclamationCircleFilled />,
                // content: 'Some descriptions',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                  axios.post('/activityReg/delete', record)
                  .then(res => {
                    if (res.status === 200) {
                      setData(data.filter(item => item.id !== record.id));
                      message.success('删除成功');
                    }
                  })
                },
                onCancel() {
                  // console.log('Cancel');
                  message.success('您已取消删除');
                },
              });

            }
          }>删除</a>
        </Space>
      ),
    },
  ];

  const role = localStorage.getItem('role');
  if (role !== '2') {
    columns.pop();
  }


  useEffect(() => {
    axios.post('/activityReg/list', {})
      .then(res => {
        if (res.status === 200) {
          setData(res.data.activityRegList.sort((a:DataItemType, b:DataItemType) => b.id - a.id));
        }
      })
  }, []);

  return (
    <>
      <Button type="primary"
        style={{
          position: 'absolute',
          top: 15,
          right: 45
        }}
      >
        下载捐赠说明单
      </Button>
      {localStorage.getItem('role') === '2' && <Button type="primary"
        style={{
          position: 'absolute',
          top: 15,
          right: 190
        }}
      >
        新建
      </Button>}
      <Table columns={columns} dataSource={data} />
    </>
  )
};
