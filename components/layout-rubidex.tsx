import React, { useState } from 'react';
// import './index.css';
//import {styles} from "./layout-rubidex.css"
import {
  // DesktopOutlined,
  // FileOutlined,
  // PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  // getItem('Option 1', '1', <PieChartOutlined />),
  // getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Admin', 'sub1', <UserOutlined />, [
    getItem('Create blockset', '3'),
    getItem('Placeholder', '4'),
  ]),
  getItem('Standard user', 'sub2', <TeamOutlined />, [
    getItem('Create block', '6'), 
    getItem('Placeholder 2', '8')
  ]),
  // getItem('Files', '9', <FileOutlined />),
];

const LayoutRubidex: React.FC<{ children: any }> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0)' }}>
          <img src="/assets/rubidex-logo-nav.svg" alt="rubidex-logo" /> 
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: 'rgba(0,21,42)' }}>
          <h2 className='header-text' style={{color: "white"}}>some text</h2>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {props.children}
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Bill is a cat.
          </div> */}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutRubidex;