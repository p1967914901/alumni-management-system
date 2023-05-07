import { ProDescriptions } from '@ant-design/pro-components';
import { Select, Cascader, message } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';


interface UserInfoType {
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

interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
  loading?: boolean;
}

const optionLists: Option[] = [
  {
    value: 0,
    label: '院内',
    isLeaf: false,
  },
  {
    value: 1,
    label: '省级',
    isLeaf: false,
  },
  {
    value: 2,
    label: '国际',
    isLeaf: false,
  },
];

export default () => {

  const [data, setData] = useState<UserInfoType>({
    name: '',
    userId: '',
    birthday: '2001-01-01',
    sex: 0,
    major: '',
    college: '',
    alumniAssociationId: '',
    alumniAssociationName: '',
    phone: '',
    address: '',
    employer: '',
    job: '',
    email: '',
    isManager: 0,
    isTutor: 0,
    createTime: ''
  });
  const [options, setOptions] = useState<Option[]>(optionLists);

  const onChange = (value: (string | number)[], selectedOptions: Option[]) => {
    console.log(value, selectedOptions);
  };

  const loadData = (selectedOptions: Option[]) => {
    console.log(selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    axios.post('/alumni/list', { type: targetOption.value })
      .then(res => {
        targetOption.loading = false;
        targetOption.children = res.data.alumniList.map((v:any) => ({...v, value: { id: v.id, name: v.name }, label: v.name}));
        setOptions([...options]);
      })
  };
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('userInfo') as string));
  }, []);



  return (
    <ProDescriptions
      bordered
      dataSource={data}
      editable={{
        onSave: async (key, record) => {
          let newData:any = null;
          if (key === 'alumniAssociationName') {
            const end = record.alumniAssociationName.length;
            if (end === 1) {
              message.warn('请选择具体的校友会');
              return false;
            }
            newData = {...data, alumniAssociationName: (record.alumniAssociationName as any)[1]['name'], alumniAssociationId: (record.alumniAssociationName as any)[1]['id']};
          } else {
            newData = {...data, ...record };
          }
          setData(newData);
          axios.post('/user/update', { ...newData })
            .then(res => {
              localStorage.setItem('userInfo', JSON.stringify(newData));
              message.success('保存成功');
            })
          console.log(key, record);
        }
      }}
      columns={[
        {
          title: '名字',
          key: 'name',
          dataIndex: 'name',
          copyable: false,
          ellipsis: true,
        },
        {
          title: '学号',
          key: 'userId',
          dataIndex: 'userId',
          copyable: true,
          editable: false,
        },
        {
          title: '出生日期',
          key: 'birthday',
          dataIndex: 'birthday',
          valueType: 'date',
        },
        {
          title: '性别',
          key: 'sex',
          dataIndex: 'sex',
          copyable: false,
          renderText: (text) => (text === 1 ? '男' : '女'),
          renderFormItem: () => {
            return <Select options={[
              { value: 1, label: '男' },
              { value: 0, label: '女' },
            ]} />
          }
        },
        {
          title: '专业',
          key: 'major',
          dataIndex: 'major',
          copyable: false,
        },
        {
          title: '学院',
          key: 'college',
          dataIndex: 'college',
          renderFormItem: () => {
            return <Select options={[
              '信息管理与人工智能学院', '财政税务学院', '会计学院', '经济学院', '外国语学院', '人文与传播学院',
              '创业学院', '公共管理学院', '金融学院', '法学院学院', '数据科学学院', '艺术学院', '马克思学院'
            ].map((v:string) => ({value:v, label: v}))} />
          }
        },
        {
          title: '联系电话',
          key: 'phone',
          dataIndex: 'phone',
          copyable: true,
        },
        {
          title: '地址',
          key: 'address',
          dataIndex: 'address',
          copyable: true,
        },
        {
          title: '工作单位',
          key: 'employer',
          dataIndex: 'employer',
        },
        {
          title: '职业',
          key: 'job',
          dataIndex: 'job',
        },{
          title: '邮箱',
          key: 'email',
          dataIndex: 'email',
          copyable: true,
        },{
          title: '权限',
          key: 'isManager',
          dataIndex: 'isManager',
          editable: false,
          renderText: (text) => (text === 0 ? '校友' : (text === 1 ? '校友会管理员' : '学校管理员')),
        },{
          title: '是否兼职导师',
          key: 'isTutor',
          dataIndex: 'isTutor',
          editable: false,
          renderText: (text) => (text === 0 ? '否' : '是'),
        },{
          title: '注册时间',
          key: 'createTime',
          dataIndex: 'createTime',
          editable: false,
        },
        {
          title: '校友会',
          key: 'alumniAssociationName',
          dataIndex: 'alumniAssociationName',
          renderFormItem: () => {
            return <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />;
          }

        },
      ]}

    >
    </ProDescriptions>
  );
};
