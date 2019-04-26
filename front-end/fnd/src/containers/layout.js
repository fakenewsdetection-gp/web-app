import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react'

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

const {
  Header, Content, Footer, Sider,
} = Layout;

const SubMenu = Menu.SubMenu;


class LayoutPage extends Component {

  state = {
      collapsed: false,
    };

  constructor(props) {
    super(props);
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Stance Detection</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>Bias Detection</span></span>}
            >
              <Menu.Item key="3">Lexicon-based</Menu.Item>
            </SubMenu>

            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>News Summarization</span>
            </Menu.Item>

            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>About</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <Icon type="home" />
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <span>Application List</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Application
              </Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              This is a component to be filled!
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutPage;
