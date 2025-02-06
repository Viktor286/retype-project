import { Layout, Menu } from 'antd';
import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const items = [
  { icon: UserOutlined, title: 'Python' },
  { icon: VideoCameraOutlined, title: 'Javascript' },
  { icon: VideoCameraOutlined, title: 'Typescript' },
  { icon: UploadOutlined, title: 'C++' },
  { icon: BarChartOutlined, title: 'Java' },
  { icon: CloudOutlined, title: 'Go' },
  { icon: AppstoreOutlined, title: 'PHP' },
  { icon: TeamOutlined, title: 'HTML' },
  { icon: ShopOutlined, title: 'CSS' },
  { icon: ShopOutlined, title: 'Rust' },
  { icon: ShopOutlined, title: 'SQL' },
  { icon: ShopOutlined, title: 'MongoDB' },
  { icon: ShopOutlined, title: 'Swift' },
  { icon: ShopOutlined, title: 'K8s' },
  { icon: ShopOutlined, title: 'Bash' },
].map(({ icon, title }, index) => ({
  key: String(index + 1),
  // icon: React.createElement(icon),
  label: `${title}`,
}));

export const AsideDrawer = ({ collapsed, setCollapsed }) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: 'var(--blue-bg)',
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={items}
        style={{ background: 'var(--blue-bg)' }}
      />
    </Sider>
  );
};
