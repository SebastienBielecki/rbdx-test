import React, { useState } from 'react';
import Link from "next/link"
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
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
  getItem('Admin', 'sub1', <UserOutlined />, [
    getItem(<Link href="/createTable">Create Blockset</Link>, '3'),
    getItem('Placeholder', '4'),
  ]),
  getItem('Standard user', 'sub2', <TeamOutlined />, [
    getItem(<Link href="/insert">Create Block</Link>, '6', ), 
    getItem('Placeholder 2', '8')
  ]),
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
          <Link href="/">
            <img src="/assets/rubidex-logo-nav.svg" alt="rubidex-logo" />
          </Link>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: 'rgba(0,21,42)' }}>
          <h2 className='header-text' style={{color: "white"}}></h2>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutRubidex;