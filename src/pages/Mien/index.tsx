import { LikeOutlined, MessageOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { ProList, DrawerForm,
  ProFormTextArea,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText } from '@ant-design/pro-components';
import { Button, Tag, Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import fileDownload from '@/utils/fileDownload';

const { confirm } = Modal;
interface dataItemType {
  id: number;
  title: string;
  college: string;
  age: number;
  sex: number;
  job: string;
  content: string;
  isSchoolLevel: number;
  image: string;
}

export default () => {

  const [dataSource, setDataSource] = useState<Array<dataItemType>>([]);
  const [drawerVisit, setDrawerVisit] = useState(false);
  const [detailData, setDetailData] = useState<dataItemType>({
    id: 0,
    title: '',
    college: '',
    age: 0,
    sex: 0,
    job: '',
    content: '',
    isSchoolLevel: 0,
    image: ''
  });
  const [form] = Form.useForm<dataItemType>();
  const [action, setAction] = useState<'编辑' | '新增'>('编辑');

  useEffect(() => {
    axios.post('/style/list', {})
      .then(res => {
        setDataSource(res.data.newsList.sort((a:dataItemType, b:dataItemType) => b.id - a.id));
      })
  }, []);

  return (
    <>
    <ProList<{ title: string }>
      toolBarRender={() => {
        return [
          <Button type="link" onClick={
            async () => {
              setAction('新增');
              setDetailData({
                id: dataSource.length ? dataSource[0].id + 1 : 0,
                title: '',
                college: '',
                age: 0,
                sex: 0,
                job: '',
                content: '',
                isSchoolLevel: 0,
                image: ''
              });
              setDrawerVisit(true);
            }
          }>
            新增
          </Button>,
          <Button type="link" onClick={
            () => {
              fileDownload('evaluation.doc');
            }
          }>
            下载申请表
          </Button>,
        ];
      }}
      itemLayout="vertical"
      rowKey="id"
      headerTitle="校友风采"
      dataSource={dataSource}
      onItem={(record: any, index: number) => {
        return {
          onMouseEnter: () => {
            // console.log(record);
          },
          onClick: () => {
            if (localStorage.getItem('role') === '2') {
              console.log(record);
              setDrawerVisit(true);
              setDetailData(record);
              form.setFieldsValue(record);
              setAction('编辑');
            }
          },

        };
      }}
      metas={{
        title: {},
        description: {
          render: (dom, entiy, index) => (
            <>
              <Tag color='#2db7f5'>学院：{dataSource[index]['college']}</Tag>
              <Tag color='#f50'>年龄：{dataSource[index]['age']}</Tag>
              <Tag color="#87d068">性别：{dataSource[index]['sex'] === 1 ? '男' : '女'}
              </Tag>
              <Tag color="#108ee9">职业：{dataSource[index]['job']}</Tag>
            </>
          ),
        },

        // extra: {
        //   render: (dom:any, entiy:any, index:any) => (
        //     <img
        //       width={272}
        //       alt="logo"
        //       // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        //       src={dataSource[index]['image']}
        //     />
        //   ),
        // },
        content: {
          render: (dom, entiy, index) => {
            return (
              <div>
                {dataSource[index]['content']}
              </div>
            );
          },
        },
      }}
    />
    <DrawerForm disabled={false}
        onOpenChange={setDrawerVisit}
        title={'操作'}
        open={drawerVisit}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              <Button type='primary'
                key="reset"
                onClick={() => {
                  confirm({
                    title: '您确认要删除此记录吗？',
                    icon: <ExclamationCircleFilled />,
                    // content: 'Some descriptions',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk() {
                      axios.post('/style/delete', detailData)
                      .then(res => {
                        if (res.status === 200) {
                          setDataSource(dataSource.filter(item => item.id !== detailData.id));
                          message.success('删除成功');
                          form.resetFields();
                          setDrawerVisit(false);
                        }
                      })
                    },
                    onCancel() {
                      // console.log('Cancel');
                      message.success('您已取消删除');
                    },
                  });
                }}
              >
                删除
              </Button>,
              ...defaultDoms,
            ];
          },
        }}
        onFinish={async () => {
          form.resetFields();
          // console.log(detailData)
          if (action === '编辑') {
            // console.log({ ...detailData})
            axios.post('/style/update', detailData).then(res => {
              setDataSource(dataSource.map(item => item.id === detailData.id ? detailData : item));
              message.success('编辑成功');
              setDrawerVisit(false);
            });
          } else {
            console.log(detailData);
            axios.post('/style/insert', {
              ...detailData, id: undefined
            }).then(res => {
              setDataSource([detailData, ...dataSource])
              message.success('添加成功');
              setDrawerVisit(false);
            });
          }
        }}
      >
        <ProForm
          initialValues={{
            ...detailData,
          }}
          // onChange={(e) => console.log(e)}
          onValuesChange={(_, values) => {
            // console.log(values);
            const de = {...values};
            de.college = (de.college as any)?.value;
            de.sex = (de.sex as any)?.value;
            if (action === '编辑') {
              de.id = detailData.id;
            }
            setDetailData(de);
            // setDetailData({...values, tag: ['string', 'undefined'].includes(typeof values['tag']) ? values['tag'] : (values['tag'] as any)['value']});
            // form.setFieldsValue(values);
          }}
          onFinish={async (value) => console.log(value)}
          form={form}
          submitter={false}
        >
          <ProForm.Group>
            <ProFormText
              width="xs"
              name="title"
              label="名字"
              placeholder="请输入名字"
              rules={[{ required: true, message: '请填写名字' }]}
            />
            <ProFormSelect
              width="sm"
              fieldProps={{
                labelInValue: true,
              }}
              request={async () => ['信息管理与人工智能学院', '财政税务学院', '会计学院',
                '经济学院', '外国语学院', '人文与传播学院', '创业学院', '公共管理学院',
                '金融学院', '法学院学院', '数据科学学院', '艺术学院', '马克思学院'
              ].map(v => ({label: v, value: v}))}
              name="college"
              label="学院"
              rules={[{ required: true, message: '请选择学院' }]}
            />
            <ProFormDigit label="年龄" name="age" width="xs" min={1}
              rules={[{ required: true, message: '请填写年龄' }]}
            />
            <ProFormSelect
              width="xs"
              fieldProps={{
                labelInValue: true,
              }}
              request={async () => [
                { label: '男', value: 1 },
                { label: '女', value: 0 },
              ]}
              name="sex"
              label="性别"
              rules={[{ required: true, message: '请选择性别' }]}
            />
            <ProFormText
              width="sm"
              name="job"
              label="职业"
              placeholder="请输入职业"
              rules={[{ required: true, message: '请填写职业' }]}
            />
          </ProForm.Group>
          <ProFormTextArea disabled={localStorage.getItem('role') !== '2'}
            width="xl"
            label="内容"
            name="content"
            fieldProps={{
              autoSize: true
            }}
          />
        {/* <ProFormText name='id' /> */}

        </ProForm>
      </DrawerForm>
      </>
  );
};
