import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from 'umi';




interface dataItemType {
  title: string;
  college: string;
  age: number;
  sex: string;
  job: string;
  content: string;
  isSchoolLevel: number;
  image: string;
}

export default () => {

  const [dataSource, setDataSource] = useState<Array<dataItemType>>([]);

  useEffect(() => {
    request('/api/getMienList').then(res => {
      setDataSource(res.data);
    })
  }, []);

  return (
    <ProList<{ title: string }>
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            下载申请表
          </Button>,
        ];
      }}
      itemLayout="vertical"
      rowKey="id"
      headerTitle="校友风采"
      dataSource={dataSource}
      metas={{
        title: {},
        description: {
          render: (dom, entiy, index) => (
            <>
              <Tag color='#2db7f5'>学院：{dataSource[index]['college']}</Tag>
              <Tag color='#f50'>年龄：{dataSource[index]['age']}</Tag>
              <Tag color="#87d068">性别：{dataSource[index]['sex']}
              </Tag>
              <Tag color="#108ee9">职业：{dataSource[index]['job']}</Tag>
            </>
          ),
        },
        extra: {
          render: (dom:any, entiy:any, index:any) => (
            <img
              width={272}
              alt="logo"
              // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              src={dataSource[index]['image']}
            />
          ),
        },
        content: {
          render: (dom, entiy, index) => {
            return (
              <div>
                {dataSource[index]['content'].repeat(10)}
              </div>
            );
          },
        },
      }}
    />
  );
};
