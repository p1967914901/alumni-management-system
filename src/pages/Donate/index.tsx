import { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, message, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from '../../utils/axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { ModalForm, ProForm, ProFormText, ProFormDatePicker, ProFormDigit, ProFormTextArea } from '@ant-design/pro-components';
import getTimeFormat from '@/utils/getTime';
import fileDownload from '@/utils/fileDownload';
interface DataItemType {
  id: number,
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
  const [detail, setDetail] = useState<DataItemType>({
    username: '',
    id: 9999,
    donationNum: 0,
    createTime: getTimeFormat(),
    donationPurpose: ''
  });
  const [modalVisit, setModalVisit] = useState(false);
  const [action, setAction] = useState<'新增' | '编辑'>('新增');
  const [modalVisit1, setModalVisit1] = useState(false);

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
              // console.log(record)
              setDetail(record);
              setAction('编辑');
              setModalVisit(true);
            }
          }>
            编辑
          </a>
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
          console.log(res.data.activityRegList.filter((item:any) => Object.is(item.userId, null)).sort((a:DataItemType, b:DataItemType) => b.id - a.id))
          setData(res.data.activityRegList.filter((item:any) => !item.userId).sort((a:DataItemType, b:DataItemType) => b.id - a.id));
        }
      })
  }, []);

  return (
    <>
      <Button type="link"
        style={{
          position: 'absolute',
          top: 15,
          right: 45
        }}
        onClick={
          () => {
            // fileDownload('donate.doc');
            setModalVisit1(true)
          }
        }
      >
        发起捐赠
      </Button>
      {localStorage.getItem('role') === '2' && <Button type="link"
        style={{
          position: 'absolute',
          top: 15,
          right: 190
        }}
        onClick={
          () => {
            setModalVisit(true);
            setAction('新增');
          }
        }
      >
        新建
      </Button>}
      <Table columns={columns} dataSource={data} />
      <ModalForm<DataItemType>
        title="发起活动"
        // form={form as any}
        initialValues={{
          ...detail
        }}
        autoFocusFirstInput
        onOpenChange={setModalVisit}
        open={modalVisit}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}

        submitTimeout={2000}
        onFinish={async (values) => {
          console.log(values);
          // const newAlumni = {...values, type: (values.type as any).value, num: 0, createTime: getTimeFormat()}
          if (action === '新增') {
            axios.post('/activityReg/insert', values).then(res => {
              if (res.status === 200) {
                // console.log('res', res)
                setData([values, ...data]);
                message.success('提交成功');
              }
            })
          } else {
            console.log({...detail, values})
            axios.post('/activityReg/update', {...detail, ...values}).then(res => {
              if (res.status === 200) {
                console.log('res', res)
                // setData([values, ...data]);
                setData(data.map((v => v.id === detail.id ? {...detail, ...values} : v)));
                message.success('修改成功');
              }
            })
          }

          setDetail({
            username: '',
            id: 9999,
            donationNum: 0,
            createTime: getTimeFormat(),
            donationPurpose: ''
          })
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText width="xs" name="username" label="捐赠人姓名"
            rules={[{ required: true, message: '请填写捐赠人姓名' }]}
          />
          <ProFormText width="xs" name="donationPurpose" label="用途"
            rules={[{ required: true, message: '请填写用途' }]}
          />
          <ProFormDigit label="捐赠金额" name="donationNum" width="xs" min={1}
            rules={[{ required: true, message: '请填写捐赠金额' }]}
          />
          <ProFormDatePicker name="createTime" label="捐赠时间"
          rules={[{ required: true, message: '请填写捐赠时间' }]}
        />
        </ProForm.Group>

      </ModalForm>
      <ModalForm<DataItemType>
        title="发起捐赠"
        // form={form as any}
        initialValues={{
          // ...detail
        }}
        autoFocusFirstInput
        onOpenChange={setModalVisit1}
        // open={true}
        open={modalVisit1}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}

        submitTimeout={2000}
        onFinish={async (values) => {

          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText width="sm" name="username" label="捐赠人学号" rules={[{ required: true, message: '请填写用途' }]}/>
          <ProFormText width="xs" name="username" label="捐赠人姓名"
            rules={[{ required: true, message: '请填写捐赠人姓名' }]}
          />
          <ProFormText width="xs" name="username" label="性别" rules={[{ required: true, message: '请填写用途' }]}/>
          <ProFormText width="sm" name="username" label="学院" rules={[{ required: true, message: '请填写用途' }]}/>
          <ProFormText width="xs" name="username" label="班级" rules={[{ required: true, message: '请填写用途' }]}/>
          <ProFormText width="xs" name="username" label="专业" rules={[{ required: true, message: '请填写用途' }]}/>

          <ProFormText width="xs" name="donationPurpose" label="用途"
            rules={[{ required: true, message: '请填写用途' }]}

          />
          <ProFormText width='sm' name="username" label="联系电话" rules={[{ required: true, message: '请填写用途' }]}/>

          <ProFormDigit label="捐赠金额" name="donationNum" width="xs" min={1}
            rules={[{ required: true, message: '请填写捐赠金额' }]}
          />
          <ProFormDatePicker name="createTime" label="捐赠时间"
          rules={[{ required: true, message: '请填写捐赠时间' }]}
        />
          <ProFormText width='sm' name="username" label="捐赠方式" rules={[{ required: true, message: '请填写用途' }]}/>
          <ProFormTextArea
          width="xl"
          label="备注"
          name="activityDetail"
          fieldProps={{
            autoSize: true
          }}
          // rules={[{ required: true, message: '请填写活动详情' }]}
        />
        </ProForm.Group>

      </ModalForm>
    </>
  )
};
