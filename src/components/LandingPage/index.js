import React, { useEffect, useState } from 'react';
import './index.css';
import { Col, Layout, Row, theme } from 'antd';
import useBreakpoint from '../../hooks/useBreakpoint';
import { ShowcaseCode } from './ShowcaseCode';
import { PostShowcaseContent } from './PostShowcaseContent';
import { AsideDrawer } from './AsideDrawer';

const { Header, Content, Footer } = Layout;

async function loadFrontPageContent() {
  const res = await fetch('/data/showcase/js-01.json');
  return await res.json();
}

const LandingPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageContent, setPageContent] = useState({ resourcesList: [] });
  const currentBreakpoint = useBreakpoint((breakpoint) => {
    setColCount(breakpointToColCount(breakpoint));
  });
  const [colCount, setColCount] = useState(breakpointToColCount(currentBreakpoint));

  useEffect(() => {
    loadFrontPageContent().then((result) => {
      setPageContent(result);
    });
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const numOfElements = pageContent.resourcesList.length;
  const numOfRows = Math.ceil(numOfElements / colCount);

  const table = [];
  let idx = 0;
  for (let row = 0; row < numOfRows; row++) {
    const cols = [];
    for (let col = 0; col < colCount; col++, idx++) {
      cols.push(pageContent.resourcesList[idx]);
    }
    table.push(cols);
  }

  return (
    <Layout hasSider style={{ background: 'var(--main-bg)' }}>
      {/*<AsideDrawer collapsed={collapsed} setCollapsed={setCollapsed} />*/}
      <Layout
        className={`withDefaultAnimation`}
        // style={{ marginLeft: collapsed ? 80 : 200, backgroundColor: 'var(--main-bg)' }}
        style={{ marginLeft: 0, backgroundColor: 'var(--main-bg)' }}
      >
        <div className="header-backplate"></div>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--lighter-bg)',
          }}
        >
          {/*<a href="/" className="home-logo">*/}
          <div className="box-logo" style={{ transform: 'scale(1)' }}>
            <div className="retype-logo">
              <div className="logo-icon">Rt</div>
              <div className="left-side">
                <div className="text-title">Retype_</div>
                <div className="sub-title">project</div>
              </div>
            </div>
          </div>
          {/*</a>*/}
          {/*<Menu*/}
          {/*  theme="dark"*/}
          {/*  mode="horizontal"*/}
          {/*  defaultSelectedKeys={['2']}*/}
          {/*  items={new Array(3).fill(null).map((_, index) => ({*/}
          {/*    key: String(index + 1),*/}
          {/*    label: `nav ${index + 1}`,*/}
          {/*  }))}*/}
          {/*/>*/}
        </Header>

        <Content style={{ margin: '24px 16px 0', overflow: 'initial', backgroundColor: 'var(--main-bg)' }}>
          <section className="callout">
            <h2>Improve code patterns, focus and fine motor skills by retyping stuff</h2>
            <p>
              In the digital world of global communications, AI, brain-computer interfaces... the ability to
              type stuff seems to stay one of the main ways to create and research.
            </p>
          </section>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
            }}
          >
            {table.map((cols) => (
              <Row gutter={[16, 16]} className="code-shelf-row">
                {cols.map(
                  (row) =>
                    row?.sha && (
                      <Col key={row.sha} span={24 / colCount}>
                        <ShowcaseCode codeContent={row} />
                      </Col>
                    ),
                )}
              </Row>
            ))}
            {/*Another Row:*/}
            {/*<Row gutter={[16, 16]}>{cols}</Row>*/}
          </div>
          <PostShowcaseContent />
          <section className="spacer"></section>
        </Content>

        <Footer
          className={`withDefaultAnimation`}
          style={{
            textAlign: 'center',
            position: 'fixed',
            bottom: 0,
            zIndex: 100,
            // width: `calc(100% - ${collapsed ? 80 : 200}px)`,
            width: `calc(100% - 0px)`,
            background: 'var(--lighter-bg)',
            padding: '0',
            height: '30px',
          }}
        >
          ...
        </Footer>
      </Layout>
    </Layout>
  );
};

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
      targetColCount = 1;
      break;
    case 'lg':
      targetColCount = 2;
      break;
    case 'xl':
      targetColCount = 2;
      break;
    case 'xxl':
      targetColCount = 3;
      break;
    case 'xxxl':
      targetColCount = 4;
      break;
  }
  return targetColCount;
}

export default LandingPage;
