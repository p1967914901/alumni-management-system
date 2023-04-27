import { ChromeFilled, CrownFilled, SmileFilled, TabletFilled, SettingFilled } from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/home',
        name: '首页',
        icon: <SmileFilled />,
      },
      {
        path: '/activity',
        name: '活动中心',
        icon: <CrownFilled />,
        // access: 'canAdmin',
      },
      {
        name: '校友会管理',
        icon: <TabletFilled />,
        path: '/alumniAssociation',
      },
      {
        path: '/donate',
        name: '校友捐赠',
        icon: <ChromeFilled />,
      },
      {
        path: '/mien',
        name: '校友风采',
        icon: <ChromeFilled />,
      },
      {
        path: '/service',
        name: '校友服务',
        icon: <ChromeFilled />,
      },
      {
        path: '/personalCenter',
        name: '个人中心',
        icon: <ChromeFilled />,
      },
      {
        path: '/setting',
        name: '系统设置',
        icon: <SettingFilled />,
      },
    ],
  },
  location: {
    pathname: '/',
  },
        fixSiderbar: true,
    layout: 'mix' as 'mix',
    splitMenus: true,

};
