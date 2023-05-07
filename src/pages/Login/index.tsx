import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,ProForm,
  ProConfigProvider,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import { useState, useRef } from 'react';
import { history,  } from 'umi';
import type { ProFormInstance } from '@ant-design/pro-components';
import axios from '../../utils/axios';
import { useModel } from 'umi';


type LoginType = 'login' | 'account';

export default () => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const formRef1 = useRef<ProFormInstance>();
  const formRef2 = useRef<ProFormInstance>();
  const { setUser } = useModel('useAuthModel', model => ({ setUser: model.setUser }));


  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LoginForm
          logo={require("@/static/logo.png")}
          title="校友管理系统"
          onFinish={
            async () => {
              if (loginType === 'account') {
                console.log(formRef1.current?.getFieldsValue())
                axios.post('/login', {
                  ...formRef1.current?.getFieldsValue()
                }).then(res => {
                  if (res.status === 200) {
                    message.success('登陆成功');
                    localStorage.setItem('role', String(res.data.user.isManager));
                    localStorage.setItem('userInfo', JSON.stringify(res.data.user))
                    setUser(res.data.user);
                    history.push('/home');
                  }
                }).catch(err => {
                  message.error(err.response.data.message);
                })
              } else {

              }
              // history.push('/home');
              // localStorage.setItem('role', '0');
            }
          }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
            <Tabs.TabPane key={'login'} tab={'注册'} />
          </Tabs>
          {loginType === 'account' && (
            <ProForm formRef={formRef1} submitter={false}>
              <ProFormText
                name="userId"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'请输入学号'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'密码: 初始密码为学号'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </ProForm>
          )}
          {loginType === 'login' && (
            <ProForm formRef={formRef2} submitter={false}>
              <ProFormText
                name="userId"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'请输入学号'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </ProForm>
          )}
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
