import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import React, { useState, useEffect } from 'react';
import { Select, Space, Input, message } from 'antd';
import axios from '../../utils/axios';


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type AlumniAssociationItemType = {
  name: string;
  id: number;
  type: number;
  createTime: string;
  num: number;
};


export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly AlumniAssociationItemType[]>([]);
  const [data, setData] = useState<readonly AlumniAssociationItemType[]>([]);
  const [cat, setCat] = useState('');

  const catList = ['院内', '省级', '国际'];
  useEffect(() => {
    axios.post('/alumni/list', {})
      .then(res => {
        setData(res.data.alumniList.sort((a:AlumniAssociationItemType, b:AlumniAssociationItemType) => b.id - a.id));
        setCat('院内');
      })

  }, []);

  useEffect(() => {
    setDataSource(data.filter(item => catList[item.type] === cat));
  }, [cat]);

  const columns: ProColumns<AlumniAssociationItemType>[] = [
    {
      title: '校友会名称',
      dataIndex: 'name',
      tooltip: '以地方命名，不支持加入多个',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      // 第一行不允许编辑
      // editable: (text, record, index) => {
      //   return index !== 0;
      // },
      // width: '15%',
    },
    {
      title: '人数',
      dataIndex: 'num',
      readonly: true,
      // width: '15%',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      // width: 200,
      render: (text, record, _, action) => [
        // <a
        //   key="editable"
        //   onClick={() => {
        //     action?.startEditable?.(record.id);
        //   }}
        // >
        //   编辑
        // </a>,
        <a
          key="delete"
          onClick={() => {
            axios.post('/alumni/delete', record)
              .then(res => {
                if (res.status === 200) {
                  message.success('删除成功');
                  setDataSource(dataSource.filter((item) => item.id !== record.id));
                  setData(data.filter((item) => item.id !== record.id));
                }
              })

          }}
        >
          删除
        </a>,
      ],
    },
  ];

  if (['0', '1'].includes(localStorage.getItem('role') as string)) {
    columns.pop();
  }

  return (
    <>
      <EditableProTable<AlumniAssociationItemType>
        rowKey="id"
        headerTitle="校友会"
        // maxLength={5}
        scroll={{
          x: 960,
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        recordCreatorProps={{
          position: 'top',
          record: () => ({name: '', id: (dataSource[0]?.id||9999) + 1, type: 0, createTime: '', num: 0}),
          creatorButtonText: '新建校友会',
          style: {
            display: localStorage.getItem('role') === '2' ? 'block' : 'none'
          }
        }}
        loading={false}
        toolBarRender={() => [ //
          <Space.Compact>
            <Input style={{ width: '25%' }} defaultValue="划分：" disabled/>
            <Select
              defaultValue={0}
              // style={{ width: 120 }}
              onChange={
                (value) => {
                  setCat(value === 0 ? '院内' : (value === 1 ? '省级' : '国际'));
                }
              }
              options={[
                { value: 0, label: '院内' },
                { value: 1, label: '省级' },
                { value: 2, label: '国际' },
              ]}
            />
          </Space.Compact>
        ]}
        columns={columns}
        // request={async () => ({
        //   data: defaultData,
        //   total: 3,
        //   success: true,
        // })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'single',
          editableKeys,
          onSave: async (rowKey, record, row) => {
            // console.log(rowKey, data, row);
            axios.post('/alumni/insert', {
              name: record.name,
              type: record.type,
              num: record.num,
              createTime: record.createTime
            }).then(res => {
              if (res.status === 200) {
                message.success('添加成功');
                setDataSource([record, ...dataSource]);
                setData([record, ...data]);

              }
            })
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};
