import { useState, useEffect, useRef } from 'react';
import { Space, Table, Tag, Input, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { InputRef } from 'antd';
import axios from '../../utils/axios';
import Highlighter from 'react-highlight-words';


interface UserInfoType {
  id: string;
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
  createTime: string
}

type DataIndex = keyof UserInfoType;




export default () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [data, setData] = useState<Array<UserInfoType>>([]);

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
      // ...getColumnSearchProps('email'),
    },
    {
      title: '是否担任导师',
      key: 'isTutor',
      dataIndex: 'isTutor',
      render: text => text === 1 ? '是' : '否',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={
            () => {
              axios.post('/user/delete', {...record})
                .then(res => {
                  message.success('删除成功');
                  setData(data.filter(item => item.id !== record.id));
                })
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
    axios.post('/user/list', {})
      .then(res => {
        setData(res.data.userList)
      })
  }, []);

  return <Table columns={columns} dataSource={data} scroll={{ y: 540 }}/>
};
