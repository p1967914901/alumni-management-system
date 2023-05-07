import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { useState, useEffect } from 'react';
import defaultProps from './_defaultProps';
import { IRouteComponentProps, history, useLocation } from 'umi';
import { Button, message } from 'antd';

interface UserInfoType {
  name: string,
  userId: string,
  birthday: string,
  sex: number,
  major: string,
  college: string,
  alumniAssociationId: string,
  phone: string,
  address: string,
  employer: string,
  job: string,
  email: string,
  isManager: number,
  isTutor: number,
  createTime: string,
  password: string
}

export default (props:IRouteComponentProps) => {
  const [data, setData] = useState<UserInfoType>({
    name: '',
    userId: '',
    birthday: '2001-01-01',
    sex: 0,
    major: '',
    college: '',
    alumniAssociationId: '',
    phone: '',
    address: '',
    employer: '',
    job: '',
    email: '',
    isManager: 0,
    isTutor: 0,
    createTime: '',
    password: ''
  });
  // const [columns, setColumns] = useState([]);

  useEffect(() => {
    // request.get('/api/getUserInfo').then(res => {
    //   setData(res.data);
    // });

    // request.post('/api/updateUserInfo').then(res => {
    //   console.log(res)
    // })

  }, []);

  useEffect(() => {
    // localStorage.setItem('role', '2');
  })

  const location = useLocation();
  if (location.pathname === '/login') {
    return props.children;
  }
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
      logo={false}
        token={{
          header: {
            colorBgHeader: '#f5f5f5', // #292f33
            colorHeaderTitle: '#292f33',
            colorTextMenu: '#292f33',
            colorTextMenuSecondary: '#dfdfdf',
            colorTextMenuSelected: '#fff',
            colorBgMenuItemSelected: '#22272b',
            colorTextMenuActive: 'rgba(255,255,255,0.85)',
            colorTextRightActionsItem: '#dfdfdf',
          },
          colorTextAppListIconHover: '#fff',
          colorTextAppListIcon: '#dfdfdf',
          sider: {
            colorMenuBackground: '#fff',
            colorMenuItemDivider: '#dfdfdf',
            colorBgMenuItemHover: '#f6f6f6',
            colorTextMenu: '#595959',
            colorTextMenuSelected: '#242424',
            colorTextMenuActive: '#242424',
            colorBgMenuItemCollapsedHover: '#242424',
          },
        }}
        bgLayoutImgList={[
          {
            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
            left: 85,
            bottom: 100,
            height: '303px',
          },
          {
            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
            bottom: -68,
            right: -45,
            height: '303px',
          },
          {
            src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
            bottom: 0,
            left: 0,
            width: '331px',
          },
        ]}
        {...defaultProps}
        location={{
          pathname: location.pathname,
        }}
        menu={{
          type: 'group',
        }}
        avatarProps={{
          render: () =>
            <Button type="link" size={'large'} style={{color: '#292f33'}} onClick={
              () => {
                localStorage.clear();
                history.push('/login');
                message.success('您已退出登陆');
              }
            }>
              退出登陆
            </Button>
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <div
              style={{
                textAlign: 'center',
                paddingBlockStart: 12,
              }}
            >
              footer
            </div>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => {
          // console.log(item, dom)
          return (
            <a
              onClick={() => {
                history.push(item.path as string);
              }}
            >
              {dom}
            </a>
          )
        }}
        // {...settings}
        title='校友管理系统'
      >
        <PageContainer
          breadcrumb={{
            routes: [],
          }}
          onBack={() => {
            history.goBack();
            console.log(history)
          }}
        >
          {props.children}
        </PageContainer>
      </ProLayout>
      {/* <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams={false}
      /> */}
    </div>
  );
};
