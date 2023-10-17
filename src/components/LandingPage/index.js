import React, { useState, useEffect } from 'react';
import './index.css';
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
import { Layout, Menu, theme } from 'antd';
import { Col, Row } from 'antd';
import useBreakpoint from '../../hooks/useBreakpoint';

const { Header, Content, Footer, Sider } = Layout;

async function loadFrontPageContent() {
  const res = await fetch('/data/showcase/js-01.json');
  const data = await res.json();
  console.log('@@ data', data);
}

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

function breakpointToColCount(breakpoint) {
  let targetColCount = 3;
  switch (breakpoint) {
    case 'xs':
      targetColCount = 1;
      break;
    case 'sm':
      targetColCount = 1;
      break;
    case 'md':
      targetColCount = 2;
      break;
    case 'lg':
      targetColCount = 3;
      break;
    case 'xl':
      targetColCount = 3;
      break;
    case 'xxl':
      targetColCount = 4;
      break;
  }
  return targetColCount;
}

const LandingPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const currentBreakpoint = useBreakpoint((breakpoint) => {
    setColCount(breakpointToColCount(breakpoint));
  });
  const [colCount, setColCount] = useState(breakpointToColCount(currentBreakpoint));

  useEffect(() => {
    loadFrontPageContent();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const cols = [];
  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col key={i.toString()} span={24 / colCount}>
        <div>Column</div>
      </Col>,
    );
  }

  return (
    <Layout hasSider>
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
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout className={`withDefaultAnimation`} style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            background: 'grey',
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
          />
        </Header>

        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
            }}
          >
            <Row gutter={[16, 16]}>
              {cols}
              {cols}
              {cols}
              {cols}
              {cols}
              {cols}
              {cols}
              {cols}
              {cols}
              {cols}
            </Row>
            Another Row:
            <Row gutter={[16, 16]}>{cols}</Row>
          </div>
        </Content>
        <Footer
          className={`withDefaultAnimation`}
          style={{
            textAlign: 'center',
            position: 'fixed',
            bottom: 0,
            zIndex: 100,
            width: `calc(100% - ${collapsed ? 80 : 200}px)`,
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LandingPage;
