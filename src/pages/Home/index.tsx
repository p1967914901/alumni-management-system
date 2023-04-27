import { ProList, DrawerForm,
  ProFormTextArea,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,} from '@ant-design/pro-components';
import { Tag, message, Form, Button } from 'antd';
import { useState, useEffect } from 'react';

import './index.css'

const originData = [{
  id: 'fsafsa',
  headlines: "title1",
  content: 'fsafasfdas \n 的萨顶顶仨看到阿双方承诺撒开心能看见阿森纳啊擦科斯基宁d\n风水布局饿啊空间看见按顺序啊说可能就啊身材局饿啊空间看见按顺序啊说可能就啊身材房贷首付多福多寿房贷首付水电费大发发发多大局饿啊空间看见按顺序啊说可能就啊身材房贷首付多福多寿房贷首付水电费大发发发多大局饿啊空间看见按顺序啊说可能就啊身材房贷首付多福多寿房贷首付水电费大发发发多大\nfdsafdasf sd f',
  createTime: '2023-01-02',
  tag: '文化校园',
}, {
  id: 'fsafsa',
  headlines: "title1",
  content: 'fsafasfdas\n的萨顶顶仨看到阿双方承诺撒开心能看见阿森纳啊擦科斯基宁d\n风水布局饿啊空间看见按顺序啊说可能就啊身材',
  createTime: '2023-01-02',
  tag: '文化校园',
}, {
  id: 'fsafsa',
  headlines: "title1",
  content: 'fsafasfdas\n的萨顶顶仨看到阿双方承诺撒开心能看见阿森纳啊擦科斯基宁d\n风水布局饿啊空间看见按顺序啊说可能就啊身材',
  createTime: '2023-01-02',
  tag: '文化校园',
}, {
  id: 'fsafsa',
  headlines: "title1",
  content: 'fsafasfdas\n的萨顶顶仨看到阿双方承诺撒开心能看见阿森纳啊擦科斯基宁d\n风水布局饿啊空间看见按顺序啊说可能就啊身材',
  createTime: '2023-01-02',
  tag: '文化校园',
}, {
  id: 'fsafsa',
  headlines: "title1",
  content: 'fsafasfdas\n的萨顶顶仨看到阿双方承诺撒开心能看见阿森纳啊擦科斯基宁d\n风水布局饿啊空间看见按顺序啊说可能就啊身材',
  createTime: '2023-01-02',
  tag: '学术科研',
}, {
  id: 'fsafsa',
  headlines: "title1",
  content: 'fsafasfdas\n的萨顶顶仨看到阿双方承诺撒开心能看见阿森纳啊擦科斯基宁d\n风水布局饿啊空间看见按顺序啊说可能就啊身材',
  createTime: '2023-01-02',
  tag: '学术科研',
}, {
  id: 'fsafsa',
  headlines: "title1",
  content: 'fsafasfdas\n的萨顶顶仨看到阿双方承诺撒开心能看见阿森纳啊擦科斯基宁d\n风水布局饿啊空间看见按顺序啊说可能就啊身材',
  createTime: '2023-01-02',
  tag: '学术科研',
}, {
  id: 'fsafsa',
  headlines: "title1",
  content: 'fsafasfdas\n的萨顶顶仨看到阿双方承诺撒开心能看见阿森纳啊擦科斯基宁d\n风水布局饿啊空间看见按顺序啊说可能就啊身材',
  createTime: '2023-01-02',
  tag: '学术科研',
}, {
  id: 'fsafsa',
  headlines: "title1",
  content: 'fsafasfdas\n的萨顶顶仨看到阿双方承诺撒开心能看见阿森纳啊擦科斯基宁d\n风水布局饿啊空间看见按顺序啊说可能就啊身材',
  createTime: '2023-01-02',
  tag: '学术科研',
}, {
  id: 'fsafsa',
  headlines: "title1",
  content: 'fsafasfdas\n的萨顶顶仨看到阿双方承诺撒开心能看见阿森纳啊擦科斯基宁d\n风水布局饿啊空间看见按顺序啊说可能就啊身材房贷首付多福多寿房贷首付水电费大发发发多大\n的萨放开那块',
  createTime: '2023-01-02',
  tag: '学术科研',
}]



interface NewsItemType {
  id: string,
  headlines: string,
  content: string,
  createTime: string,
  tag: string,
}

export default () => {
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
  }, []);

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
              console.log(record);
            },
            onClick: () => {
              setDrawerVisit(true);
              // console.log(originData[index]);
              setDetailData(originData[index]);
              form.setFieldsValue(originData[index]);
              setIndex(index);
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
        title='修改'
        open={drawerVisit}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              <Button type='primary'
                key="reset"
                onClick={() => {
                  // props.submit();
                  form.resetFields(['headlines', 'content', 'tag']);
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
              </Button>,
              ...defaultDoms,
            ];
          },
        }}
        onFinish={async () => {
          // data =
          // await setData
          // message.success('提交成功');
          // console.log('formData', formData)
          // return true;
          form.resetFields()
          console.log(form.getFieldsValue(true))
          console.log(form)
        }}
      >
        <ProForm
          initialValues={{
            ...detailData,
            // tag: {label: detailData['tag'], value: detailData['tag']}
          }}
          // onChange={(e) => console.log(e)}
          onValuesChange={(_, values) => {
            // console.log(values);
            setDetailData(values as NewsItemType);
            // form.setFieldsValue(values);
          }}
          onFinish={async (value) => console.log(value)}
          form={form}

        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="headlines"
              label="标题"
              tooltip="最大字数为 20 字"
              placeholder="请输入标题"
              rules={[{ required: true, message: '请填写标题' }]}

            />

            <ProFormSelect
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
            <ProFormDatePicker
              name="createTime"
              label="时间"
              rules={[{ required: true, message: '请选择时间' }]}
            />

          </ProForm.Group>
          <ProFormTextArea
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
