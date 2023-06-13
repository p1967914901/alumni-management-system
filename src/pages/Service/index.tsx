import { useState, useEffect, useRef } from 'react';
import { Space, Table, Tag, Input, Button, message, Badge, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { InputRef } from 'antd';
import axios from '../../utils/axios';
import Highlighter from 'react-highlight-words';
import { ExclamationCircleFilled } from '@ant-design/icons';
import fileDownload from '@/utils/fileDownload';
import { ModalForm, ProForm, ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import mockjs from 'mockjs';

const { confirm } = Modal;

interface UserInfoType {
  id: number;
  name: string,
  userId: string,
  birthday: string,
  sex: number,
  major: string,
  college: string,
  alumniAssociationId: string,
  alumniAssociationName: string,
  phone: string,
  address: string,
  employer: string,
  job: string,
  email: string,
  isManager: number,
  isTutor: number,
  isApply: number,
  card: string,
  createTime: string
}

type DataIndex = keyof UserInfoType;




export default () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [data, setData] = useState<Array<UserInfoType>>([]);
  const [applyData, setApplyData] = useState<Array<UserInfoType>>([]);
  const [modalVisit, setModalVisit] = useState(false);
  const [modalVisit1, setModalVisit1] = useState(false);


  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ): void => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<UserInfoType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            过滤
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            关闭
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record:any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
        // <div></div>
      ) : (
        text
      ),
  });

  const columns: ColumnsType<UserInfoType> = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '用户名',
      dataIndex: 'userId',
      key: 'userId',
      ...getColumnSearchProps('userId'),
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday',
      ...getColumnSearchProps('birthday'),
      // render: (text) => <Tag color={typeToColor[text as '奖学金']}>{text}</Tag>
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: text => text === 1 ? '男' : '女',
      filters: [
        {
          text: '男',
          value: 1,
        },
        {
          text: '女',
          value: 0,
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.sex === value,
    },
    {
      title: '专业',
      key: 'major',
      dataIndex: 'major',
      ...getColumnSearchProps('major'),
    },
    {
      title: '学院',
      dataIndex: 'college',
      key: 'college',
      ...getColumnSearchProps('college'),
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
      // render: (text) => <Tag color={typeToColor[text as '奖学金']}>{text}</Tag>
    },
    {
      title: '联系地址',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),

    },
    {
      title: '就业单位',
      key: 'employer',
      dataIndex: 'employer',
      ...getColumnSearchProps('employer'),

    },
    {
      title: '职业',
      key: 'job',
      dataIndex: 'job',
      ...getColumnSearchProps('job'),

    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),

    },
    {
      title: '级别',
      key: 'isManager',
      dataIndex: 'isManager',
      render: text => text === 0 ? '校友' : (text === 1 ? '校友会管理员' : '学校管理员'),
      filters: [
        {
          text: '学校管理员',
          value: 2,
        },
        {
          text: '校友会管理员',
          value: 1,
        },
        {
          text: '校友',
          value: 0,
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.isManager === value,
    },
    {
      title: '是否担任导师',
      key: 'isTutor',
      dataIndex: 'isTutor',
      render: text => text === 1 ? '是' : '否',
      filters: [
        {
          text: '是',
          value: 1,
        },
        {
          text: '否',
          value: 0,
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.isTutor === value,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={
            () => {
              confirm({
                title: '您确认要删除此记录吗？',
                icon: <ExclamationCircleFilled />,
                // content: 'Some descriptions',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                  axios.post('/user/delete', record)
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
  const applyColumns: ColumnsType<UserInfoType> = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '用户名',
      dataIndex: 'userId',
      key: 'userId',
      ...getColumnSearchProps('userId'),
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={
            () => {
              console.log(record)
              const info = {...record, isApply: 0, card: mockjs.Random.id()};
              axios.post('/user/update', info)
                .then(res => {
                  message.success('成功通过');
                  if (JSON.parse(localStorage.getItem('userInfo') as string)['id'] === info.id) {
                    localStorage.setItem('userInfo', JSON.stringify(info));
                  }
                  setData(data.filter(item => item.id !== record.id));
                })
            }
          }>同意</a>
        </Space>
      ),
    },
  ];
  const role = localStorage.getItem('role');
  if (role !== '2') {
    columns.pop();
  }


  useEffect(() => {
    axios.post('/user/list', {})
      .then(res => {
        setData(res.data.userList)
      })
  }, []);

  useEffect(() => {
    const applyList = [];
    for(const item of data) {
      if (item.isApply) {
        applyList.push(item);
      }
    }
    setApplyData(applyList);
  }, [data])

  return (
    <>
      <Table columns={columns} dataSource={data} scroll={{ y: 540 }}/>
      {localStorage.getItem('role') === '2' && <div style={{
          position: 'absolute',
          top: 15,
          right: 470
        }}>
        <Badge count={applyData.length}>
          <Button type="link" onClick={
            () => {
              setModalVisit(true);
            }
          }>校友卡申请列表</Button>
        </Badge>
      </div>}
      <Button type="link" disabled={JSON.parse(localStorage.getItem('userInfo') as string)['isApply'] === 1 || JSON.parse(localStorage.getItem('userInfo') as string)['card']}
        style={{
          position: 'absolute',
          top: 15,
          right: 190
        }} onClick={
          async () => {
            const info = {...JSON.parse(localStorage.getItem('userInfo') as string), isApply: 1}
            const res = await axios.post('/user/update', info);
            localStorage.setItem('userInfo', JSON.stringify(info));
            setData(data.map(item => item.id === info.id ? info : item));
          }
        }
      >
        {
          JSON.parse(localStorage.getItem('userInfo') as string)['card'] ? '校友卡卡号：' + JSON.parse(localStorage.getItem('userInfo') as string)['card'] :
          (JSON.parse(localStorage.getItem('userInfo') as string)['isApply'] === 1 ? '校友卡申请中' : '申请校友卡')
        }
      </Button>
      <Button type="link"
        style={{
          position: 'absolute',
          top: 15,
          right: 45
        }}
        onClick={
          () => {
            // fileDownload('tutor.doc');
            setModalVisit1(true)

          }
        }
      >
        导师申请
      </Button>
      <ModalForm
        title="校友卡申请列表"
        autoFocusFirstInput
        onOpenChange={setModalVisit}
        open={modalVisit}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}

        submitTimeout={2000}
        onFinish={async (values) => {
          return true;
        }}
      >
        <Table columns={applyColumns} dataSource={applyData} scroll={{ y: 340 }}/>
      </ModalForm>
      <ModalForm
        title="兼职导师申请表"
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
          <ProFormText width="sm" name="username" label="学号" rules={[{ required: true, message: '请填写用途' }]}/>
          <ProFormText width="xs" name="username" label="姓名"
            rules={[{ required: true, message: '请填写姓名' }]}
          />
          <ProFormText width="xs" name="username" label="性别" rules={[{ required: true, message: '请填写用途' }]}/>
          <ProFormText width="xs" name="username" label="学历" rules={[{ required: true, message: '请填写用途' }]}/>
          <ProFormText width="sm" name="username" label="联系方式" rules={[{ required: true, message: '请填写用途' }]}/>
          <ProFormText width="sm" name="username" label="工作单位" rules={[{ required: true, message: '请填写用途' }]}/>

          {/* <ProFormText width="xs" name="donationPurpose" label="用途"
            rules={[{ required: true, message: '请填写用途' }]}

          />
          <ProFormText width='sm' name="username" label="联系电话" rules={[{ required: true, message: '请填写用途' }]}/>

          <ProFormDigit label="捐赠金额" name="donationNum" width="xs" min={1}
            rules={[{ required: true, message: '请填写捐赠金额' }]}
          /> */}
          {/* <ProFormDatePicker name="createTime" label="捐赠时间"
          rules={[{ required: true, message: '请填写捐赠时间' }]}
        /> */}
          {/* <ProFormText width='sm' name="username" label="捐赠方式" rules={[{ required: true, message: '请填写用途' }]}/> */}
          <ProFormTextArea
          width="xl"
          label="工作经历"
          name="activityDetail"
          fieldProps={{
            autoSize: true
          }}
          rules={[{ required: true, message: '请填写活动详情' }]}
        />
        <ProFormTextArea
          width="xl"
          label="个人成果"
          name="activityDetail"
          fieldProps={{
            autoSize: true
          }}
          rules={[{ required: true, message: '请填写活动详情' }]}
        />
        <ProFormTextArea
          width="xl"
          label="个人小结"
          name="activityDetail"
          fieldProps={{
            autoSize: true
          }}
          rules={[{ required: true, message: '请填写活动详情' }]}
        />
        <ProFormTextArea
          width="xl"
          label="备注"
          name="activityDetail"
          fieldProps={{
            autoSize: true
          }}
          // rules={[{ required: true, message: '请填写活动详情' }]}
        />
        {/* <ProFormTextArea
          width="xl"
          label=""
          name="activityDetail"
          fieldProps={{
            autoSize: true
          }}
          // rules={[{ required: true, message: '请填写活动详情' }]}
        /> */}
        </ProForm.Group>

      </ModalForm>
    </>
  )
};
