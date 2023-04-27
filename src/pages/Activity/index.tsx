import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ProList, ModalForm, ProForm, ProFormText, ProFormTimePicker, ProFormDatePicker, ProFormDateTimePicker, ProFormDigit, ProFormTextArea, } from '@ant-design/pro-components';
import { Button, Tag, Statistic, message } from 'antd';
import React, { useState } from 'react';

const { Countdown } = Statistic;

interface ActivityItemType {
  title: string,
  address: string,
  num: number,
  activityDetail: string,
  endTime: string,
  fee: number,
  createTime: string,
  time: string,
  remainder: number
}

const dataSource = [
  {
    title: '语雀的天空',
    address: '地址',
    num: 30,
    activityDetail: '活动详情',
    endTime: '2023-09-01 14:00',
    fee: 10000,
    createTime: '2022-12-12',
    time: '2024-01-01',
    remainder: 10
  },
  {
    title: 'Ant Design',
    address: '地址',
    num: 30,
    activityDetail: '活动详情',
    endTime: '2023-04-01 12:00:00',
    fee: 10000,
    createTime: '2022-12-12',
    time: '2024-01-01',
    remainder: 10

  },
  {
    title: '蚂蚁金服体验科技',
    address: '地址',
    num: 30,
    activityDetail: '活动详情',
    endTime: '2023-05-01 12:00:15',
    fee: 10000,
    createTime: '2022-12-12',
    time: '2024-01-01',
    remainder: 10

  },
  {
    title: 'TechUI',
    address: '地址',
    num: 30,
    activityDetail: '活动详情',
    endTime: '2023-05-13 12:13:13',
    fee: 10000,
    createTime: '2022-12-12',
    time: '2024-01-01',
    remainder: 0

  },
  {
    title: '蚂蚁金服体验科技',
    address: '地址',
    num: 30,
    activityDetail: '活动详情',
    endTime: '2023-01-01',
    fee: 10000,
    createTime: '2022-12-12',
    time: '2024-01-01',
    remainder: 10
  },
  {
    title: 'TechUI',
    address: '地址',
    num: 30,
    activityDetail: '活动详情',
    endTime: '2023-01-01',
    fee: 10000,
    createTime: '2022-12-12',
    time: '2024-01-01',
    remainder: 10

  },
  {
    title: '蚂蚁金服体验科技',
    address: '地址',
    num: 30,
    activityDetail: '活动详情',
    endTime: '2023-01-01',
    fee: 10000,
    createTime: '2022-12-12',
    time: '2024-01-01',
    remainder: 10

  },
  {
    title: 'TechUI',
    address: '地址',
    num: 30,
    activityDetail: '活动详情',
    endTime: '2023-01-01',
    fee: 10000,
    createTime: '2022-12-12',
    time: '2024-01-01',
    remainder: 10

  },
];

export default () => {

  const [modalVisit1, setModalVisit1] = useState(false);
  const [modalVisit2, setModalVisit2] = useState(false);

  const [activityDetail, setActivityDetail] = useState({
    title: '',
    address: '',
    num: 0,
    activityDetail: '',
    endTime: '',
    fee: 0,
    createTime: '',
    time: '',
    remainder: 0
  })

  return (
    <>
    <ProList<{ title: string }>
      toolBarRender={() => {
        return [
          <Button key="2" type="primary"
            onClick={
              () => {
                setModalVisit2(true);
              }
            }
          >
            我的报名
          </Button>,
          <Button key="3" type="primary"
            onClick={
              () => {
                setModalVisit1(true);
              }
            }
          >
            发起活动
          </Button>,
        ];
      }}
      pagination={{
        defaultPageSize: 4,
        showSizeChanger: false,
      }}
      itemLayout="vertical"
      rowKey="id"
      headerTitle="活动列表"
      dataSource={dataSource}
      metas={{
        title: {},
        description: {
          render: (dom, entiy, index) => (
            <>
              <Tag color='#2db7f5'>地址：{dataSource[index]['address']}</Tag>
              <Tag color='#f50'>人数：{dataSource[index]['num']}</Tag>
              <Tag color="#87d068">经费：{dataSource[index]['fee']}
              </Tag>
              <Tag color="#108ee9">活动时间：{dataSource[index]['time']}</Tag>
              {/* <Tag color="#108ee9">报名结束时间：{dataSource[index]['time']}</Tag> */}

              {
                dataSource[index]['remainder'] ?
                <Button key="1" type="primary" style={{
                  float:'right'
                }}>
                  报名
                </Button> : null
              }
              <Countdown title="报名结束倒计时" value={dataSource[index]['endTime']} format="D 天 H 时 m 分 s 秒" />
            </>
          ),
        },

        content: {
          render: (dom, entiy, index) => {
            return (
              <div>
                段落示意：蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
              {/* <Countdown title="报名结束倒计时" value={dataSource[index]['time']} format="D 天 H 时 m 分 s 秒" /> */}

              </div>
            );
          },
        },
      }}
    />
    <ModalForm<ActivityItemType>
      title="发起活动"
      // form={form as any}
      initialValues={{
        ...activityDetail
      }}
      autoFocusFirstInput
      onOpenChange={setModalVisit1}
      open={modalVisit1}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}

      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values);
        message.success('提交成功');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText width="md" name="title" label="标题"
          rules={[{ required: true, message: '请填写标题' }]}
        />
        <ProFormText width="md" name="address" label="地址"
          rules={[{ required: true, message: '请填写地址' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDateTimePicker name="time" label="活动开始时间"
          rules={[{ required: true, message: '请填写活动开始时间' }]}
        />
        <ProFormDateTimePicker name="endTime" label="报名结束时间"
          rules={[{ required: true, message: '请填写报名结束时间' }]}
        />
        <ProFormDigit label="人数" name="num" width="xs" min={1}
          rules={[{ required: true, message: '请填写人数' }]}
        />
        <ProFormDigit label="经费" name="fee" width="xs" min={0}
          rules={[{ required: true, message: '请填写经费' }]}
        />
      </ProForm.Group>
      <ProFormTextArea
        width="xl"
        label="活动详情"
        name="activityDetail"
        fieldProps={{
          autoSize: true
        }}
        rules={[{ required: true, message: '请填写活动详情' }]}
      />
    </ModalForm>
    <ModalForm
      title="我的报名"
      onOpenChange={setModalVisit2}
      open={modalVisit2}
      submitter={false}
    >
    <ProList<{ title: string }>
      pagination={{
        defaultPageSize: 4,
        showSizeChanger: false,
      }}
      itemLayout="vertical"
      // rowKey="id"
      // headerTitle=""
      dataSource={dataSource}
      metas={{
        title: {},
        description: {
          render: (dom, entiy, index) => (
            <>
              <Tag color='#2db7f5'>地址：{dataSource[index]['address']}</Tag>
              <Tag color='#f50'>人数：{dataSource[index]['num']}</Tag>
              <Tag color="#87d068">经费：{dataSource[index]['fee']}
              </Tag>
              <Tag color="#108ee9">活动时间：{dataSource[index]['time']}</Tag>
              {/* <Tag color="#108ee9">报名结束时间：{dataSource[index]['time']}</Tag> */}


                <Button key="1" type="primary" style={{
                  float:'right'
                }}>
                  取消报名
                </Button>

            </>
          ),
        },

        content: {
          render: (dom, entiy, index) => {
            return (
              <div>
                段落示意：蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
              {/* <Countdown title="报名结束倒计时" value={dataSource[index]['time']} format="D 天 H 时 m 分 s 秒" /> */}

              </div>
            );
          },
        },
      }}
    />
    </ModalForm>
</>
  );
};
