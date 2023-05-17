import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ProList, ModalForm, ProForm, ProFormText, ProFormDateTimePicker, ProFormDigit, ProFormTextArea, } from '@ant-design/pro-components';
import { Button, Tag, Statistic, message, Form, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import getTimeFormat from '@/utils/getTime';
import { useModel } from 'umi';

const { Countdown } = Statistic;

interface ActivityItemType {
  id: number;
  title: string,
  address: string,
  num: number,
  activityDetail: string,
  endTime: string,
  fee: number,
  createTime: string,
  time: string,
  remainder: number;
  initiator: string, // 发起人名字
  isRelease: number; // 是否发布
}


export default () => {

  const [dataSource, setDataSource] = useState<ActivityItemType[]>([]);
  const [dataParticipated, setDataParticipated] = useState<ActivityItemType[]>([]);
  const [idParticipated, setIdParticipated] = useState<number[]>([]);
  const [dataNeedCheck, setDataNeedCheck] = useState<ActivityItemType[]>([]);

  const [modalVisit1, setModalVisit1] = useState(false);
  const [modalVisit2, setModalVisit2] = useState(false);
  const [modalVisit3, setModalVisit3] = useState(false);
  const [action, setAction] = useState<'编辑' | '新增'>('新增');
  const [form] = Form.useForm<ActivityItemType>();


  const [activityDetail, setActivityDetail] = useState({
    id: 9999,
    title: '',
    address: '',
    num: 0,
    activityDetail: '',
    endTime: getTimeFormat(),
    fee: 0,
    createTime: getTimeFormat(),
    time: getTimeFormat(),
    remainder: 0, // --
    initiator: '', // ---
    isRelease: 0,
  })

  useEffect(() => {
    axios.post('/activity/list', {isRelease: 1}).then(res => {
      setDataSource(res.data.activityList.sort((a:ActivityItemType, b:ActivityItemType) => b.id - a.id));
      axios.post('/activityReg/list', { userId: JSON.parse(localStorage.getItem('userInfo') as string)['id'] })
        .then(r => {
          // console.log(r.data.activityRegList);
          const ids:number[] = r.data.activityRegList.map((item:any) => item.activityId);
          setIdParticipated(ids);
          const d = [];
          for(const item of res.data.activityList) {
            if (ids.includes(item.id)) {
              d.push(item);
            }
          }
          console.log(d)
          setDataParticipated(d);
        })
    });
    axios.post('/activity/list', {isRelease: 0}).then(res => {
      setDataNeedCheck(res.data.activityList.sort((a:ActivityItemType, b:ActivityItemType) => b.id - a.id));

    });
  }, []);

  return (
    <>
    <ProList<ActivityItemType>
      toolBarRender={() => {
        return [
          localStorage.getItem('role') === '2' && <Badge count={dataNeedCheck.length}>
          <Button key="1" type="link"
            onClick={
              () => {
                setModalVisit3(true);
              }
            }
          >
            待审核的活动
          </Button>
        </Badge>,
          <Badge count={dataParticipated.length}>
            <Button key="2" type="link"
              onClick={
                () => {
                  setModalVisit2(true);
                }
              }
            >
              我的报名
            </Button>
          </Badge>, localStorage.getItem('role') === '0' ? null :
          <Button key="3" type="link"
            onClick={
              () => {
                setAction('新增');
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
                localStorage.getItem('role') === '2' &&
                <Button key="0" type="link" style={{
                  float:'right'
                }} onClick={
                  async () => {
                    console.log(dataSource[index]);
                    // return;
                    const res = await axios.post('/activity/delete', {id: dataSource[index].id});
                    if (res.status === 200) {
                      message.success('删除成功');
                      setDataSource(dataSource.filter(item => item.id !== dataSource[index].id));
                    }
                  }
                }>
                  删除
                </Button>
              }
              {
                localStorage.getItem('role') === '2' &&
                <Button key="0" type="link" style={{
                  float:'right'
                }} onClick={
                  () => {
                    setAction('编辑');
                    setModalVisit1(true);
                  }
                }>
                  编辑
                </Button>
              }
              {
                dataSource[index]['remainder'] ?
                <Button key="1" type="link" danger={idParticipated.includes(entiy.id)}  style={{
                  float:'right'
                }} onClick={
                  async () => {
                    if (!idParticipated.includes(entiy.id)) {
                      const res = await axios.post('/activityReg/insert', {
                        activityId: entiy.id, userId: JSON.parse(localStorage.getItem('userInfo') as string)['id'],
                        name: JSON.parse(localStorage.getItem('userInfo') as string)['name']
                      });
                      if (res.status === 200) {
                        message.success('报名成功');
                        setIdParticipated([entiy.id, ...idParticipated]);
                      }
                    }
                  }
                }>
                  {idParticipated.includes(entiy.id) ? '已报名' : '报名'}
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
                {
                  entiy.activityDetail.split('\n').map((str:string, index:number) => (
                    <div key={entiy.id + index} className={index === 2 ? 'ellipsis' : ''}>{str}</div>
                  ))
                }
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
        // return;
        if (action === '新增') {
          const newActivityInfo = {...activityDetail, initiator: JSON.parse(localStorage.getItem('userInfo') as string).name,
            createTime: getTimeFormat(),
            remainder: activityDetail.num,
            isRelease: localStorage.getItem('role') === '1' ? 0 : 1
          }
          axios.post('/activity/insert', newActivityInfo).then(res => {
            if (res.status === 200) {
              // console.log('res', res)
              newActivityInfo.isRelease && setDataSource([newActivityInfo, ...dataSource])
              message.success('提交成功' + (newActivityInfo.isRelease ? '' : '，等待审核'));
            }
          });
          form.resetFields();
          setActivityDetail({
            id: 999,
            title: '',
            address: '',
            num: 0,
            activityDetail: '',
            endTime: getTimeFormat(),
            fee: 0,
            createTime: getTimeFormat(),
            time: getTimeFormat(),
            remainder: 0, // --
            initiator: '', // ---
            isRelease: 0,
          });
        } else {

        }

        return true;
      }}
    >
      <ProForm
        initialValues={{
          ...activityDetail,
        }}
        // onChange={(e) => console.log(e)}
        onValuesChange={(_, values) => {
          console.log(values);
          setActivityDetail(values);
          // form.setFieldsValue(values);
        }}
        onFinish={async (value) => console.log(value)}
        form={form}
        submitter={false}
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
      </ProForm>
    </ModalForm>
    <ModalForm
      title="我的报名"
      onOpenChange={setModalVisit2}
      open={modalVisit2}
      submitter={false}
    >
    <ProList<ActivityItemType>
      pagination={{
        defaultPageSize: 4,
        showSizeChanger: false,
      }}
      itemLayout="vertical"
      // rowKey="id"
      // headerTitle=""
      dataSource={dataParticipated}
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


                <Button key="1" type="link" style={{
                  float:'right'
                }} onClick={
                  async () => {
                    console.log(entiy)
                    const res = await axios.post('/activityReg/cancel', {
                      activityId: entiy.id, userId: JSON.parse(localStorage.getItem('userInfo') as string)['id'],
                      name: JSON.parse(localStorage.getItem('userInfo') as string)['name'],
                    });
                    if (res.status === 200) {
                      message.success('取消报名成功');
                      setDataParticipated(dataParticipated.filter(item => item.id !== entiy.id));
                      setIdParticipated(idParticipated.filter(id => id !== entiy.id));
                      await axios.post('/activity/update', {...entiy, remainder: entiy.remainder + 1});

                    }
                  }
                }>
                  取消报名
                </Button>
            </>
          ),
        },

        content: {
          render: (dom, entiy, index) => {
            return (
              <div>
                {
                  entiy.activityDetail.split('\n').map((str:string, index:number) => (
                    <div key={entiy.id + index} className={index === 2 ? 'ellipsis' : ''}>{str}</div>
                  ))
                }
              {/* <Countdown title="报名结束倒计时" value={dataSource[index]['time']} format="D 天 H 时 m 分 s 秒" /> */}

              </div>
            );
          },
        },
      }}
    />
    </ModalForm>
    <ModalForm
      title="活动审核"
      onOpenChange={setModalVisit3}
      open={modalVisit3}
      submitter={false}
    >
    <ProList<ActivityItemType>
      pagination={{
        defaultPageSize: 2,
        showSizeChanger: false,
      }}
      itemLayout="vertical"
      // rowKey="id"
      // headerTitle=""
      dataSource={dataNeedCheck}
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
              <Tag color="#108ee9">发起人：{dataSource[index]['initiator']}</Tag>
              {/* <Tag color="#108ee9">报名结束时间：{dataSource[index]['time']}</Tag> */}


                <Button key="1" type="link" style={{
                  float:'right'
                }} onClick={
                  async () => {
                    // console.log(entiy)
                    const res = await axios.post('/activity/update', {
                      id: entiy.id, isRelease: 1
                    });
                    if (res.status === 200) {
                      message.success('成功通过');
                      setDataNeedCheck(dataNeedCheck.filter(item => item.id !== entiy.id));
                      setDataSource([entiy, ...dataSource]);
                    }
                  }
                }>
                  通过
                </Button>
            </>
          ),
        },

        content: {
          render: (dom, entiy, index) => {
            return (
              <div>
                {
                  entiy.activityDetail.split('\n').map((str:string, index:number) => (
                    <div key={entiy.id + index} className={index === 2 ? 'ellipsis' : ''}>{str}</div>
                  ))
                }
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
