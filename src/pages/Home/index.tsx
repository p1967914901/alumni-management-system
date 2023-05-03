import { ProList, DrawerForm,
  ProFormTextArea,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,} from '@ant-design/pro-components';
import { Tag, message, Form, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';

import './index.css'

interface NewsItemType {
  id: string,
  headlines: string,
  content: string,
  createTime: string,
  tag: string,
}

export default () => {
  const [originData, setOriginData] = useState<NewsItemType[]>([]);
  const [data, setData] = useState<any>([]);
  const [drawerVisit, setDrawerVisit] = useState(false);
  const [detailData, setDetailData] = useState<NewsItemType>({
    id: '',
    headlines: '',
    content: '',
    createTime: '',
    tag: ''
  });
  const [index, setIndex] = useState(0);
  const [form] = Form.useForm<NewsItemType>();
  const [action, setAction] = useState<'修改' | '添加'>('修改');

  useEffect(() => {
    axios.post('/news/list', {data: {}}).then(res => {
      console.log(res.data)
      setOriginData(res.data.newsList);
    });
  }, []);

  useEffect(() => {
    const data = originData.map((item) => ({
      title: item.headlines,
      subTitle: <Tag color="#5BD8A6">{item.tag}</Tag>,
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
      content: (
        <div
          style={{
            flex: 1,
            width: '100%',
            // backgroundColor: 'red'
          }}
        >
          <div
          >
            {
              item.content.split('\n').slice(0, 3).map((str:string, index:number) => (
                <div key={item.id + index} className={index === 2 ? 'ellipsis' : ''}>{str}</div>
              ))
            }
          </div>
        </div>
      ),
    }));
    setData(data);
  }, [originData]);

  const ghost = false;
  return (
    <div
      style={{
        backgroundColor: '#eee',
        margin: 24,
        padding: 24,
      }}
    >
      <ProList<any>
        toolBarRender={() => {
          return [ localStorage.getItem('role') === '2' ?
            <Button key="add" type="primary" onClick={
              () => {
                setAction('添加');
                form.resetFields(['headlines', 'content', 'tag', 'createTime']);
                setDetailData({
                  id: '',
                  headlines: '',
                  content: '',
                  createTime: '',
                  tag: ''
                });
                setDrawerVisit(true);
              }
            }>
              新建
            </Button> : null,
          ];
        }}
        ghost={ghost}
        itemCardProps={{
          ghost,
        }}
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 2 }}
        onItem={(record: any, index: number) => {
          return {
            onMouseEnter: () => {
              // console.log(record);
            },
            onClick: () => {
              setDrawerVisit(true);
              // console.log(originData[index]);
              setDetailData(originData[index]);
              form.setFieldsValue(originData[index]);
              setIndex(index);
              setAction('修改');
            },

          };
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},

        }}
        headerTitle="学校风采"
        dataSource={data}
      />
      <DrawerForm disabled={false}
        onOpenChange={setDrawerVisit}
        title={localStorage.getItem('role') === '2' ? action : '详情'}
        open={drawerVisit}
        submitter={{
          render: (props, defaultDoms) => {
            return [ localStorage.getItem('role') === '2' ?
              <Button type='primary'
                key="reset"
                onClick={() => {
                  // props.submit();
                  form.resetFields(['headlines', 'content', 'tag', 'createTime']);
                  setDetailData({
                    id: '',
                    headlines: '',
                    content: '',
                    createTime: '',
                    tag: ''
                  });
                }}
              >
                重置
              </Button> : null,
              ...defaultDoms,
            ];
          },
        }}
        onFinish={async () => {
          form.resetFields();
          if (action === '修改') {
            console.log({ ...detailData})
            axios.post('/news/update', {
              ...originData[index], ...detailData
            }).then(res => {
              originData[index] = detailData;
              setOriginData([...originData])
              message.success('修改成功');
              setDrawerVisit(false);
            });
          } else {
            axios.post('/news/insert', {
              ...detailData
            }).then(res => {
              setOriginData([detailData, ...originData]);
              message.success('添加成功');
              setDrawerVisit(false);
            });
          }
        }}
      >
        <ProForm
          initialValues={{
            ...detailData,
            tag: {label: detailData['tag'], value: detailData['tag']}
          }}
          // onChange={(e) => console.log(e)}
          onValuesChange={(_, values) => {
            console.log(values);
            setDetailData({...values, tag: ['string', 'undefined'].includes(typeof values['tag']) ? values['tag'] : (values['tag'] as any)['value']});
            // form.setFieldsValue(values);
          }}
          onFinish={async (value) => console.log(value)}
          form={form}
          submitter={false}
        >
          <ProForm.Group>
            <ProFormText disabled={localStorage.getItem('role') !== '2'}
              width="md"
              name="headlines"
              label="标题"
              tooltip="最大字数为 20 字"
              placeholder="请输入标题"
              rules={[{ required: true, message: '请填写标题' }]}

            />

            <ProFormSelect disabled={localStorage.getItem('role') !== '2'}
              width="xs"
              fieldProps={{
                labelInValue: true,
              }}
              request={async () => [
                { label: '文化校园', value: '文化校园' },
                { label: '学术科研', value: '学术科研' },
                { label: 'tag1', value: 'tag1' },
                { label: 'tag2', value: 'tag2' },
              ]}
              name="tag"
              label="标签"
              rules={[{ required: true, message: '请选择标签' }]}
            />
            <ProFormDatePicker disabled={localStorage.getItem('role') !== '2'}
              name="createTime"
              label="时间"
              rules={[{ required: true, message: '请选择时间' }]}
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
    </div>
  );
};
