import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.css';

const {
  Header, Content, Footer, Sider
} = Layout;

const SubMenu = Menu.SubMenu;


class LayoutPage extends Component {

  state = {
      collapsed: false,
      analyze: true,
      stance: false,
      bias: false,
      summarization: false,
      about: false
    };

  constructor(props) {
    super(props);
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  // renderAppropriate = () => {
  //   if (this.state.analyze) {
  //     return (
  //       <Card title="Analyze" bordered={false}>Analyze tab!!</Card>
  //     )
  //   } else if (this.state.stance) {
  //     return (
  //       <Card title="Stance" bordered={false}>Stance tab!!</Card>
  //     )
  //   } else if (this.state.bias){
  //     return (
  //       <Card title="Bias" bordered={false}>Bias tab!!</Card>
  //     )
  //   } else if (this.state.summarization){
  //     return (
  //       <Card title="Summarization" bordered={false}>Summarization tab!!</Card>
  //     )
  //   } else if (this.state.about){
  //     return (
  //       <Card title="About" bordered={false}>About tab!!</Card>
  //     )
  //   }
  // }

  analyzeSelected = () => {
    console.log('Analyze is triggered');
    this.props.history.push("/analyze");
    this.setState( {
      collapsed: this.state.collapsed,
      analyze: true,
      stance: false,
      bias: false,
      summarization: false,
      about: false
    })
  }

  stanceSelected = () => {
    console.log('Stance is triggered');
    this.props.history.push("/stance");
    this.setState( {
      collapsed: this.state.collapsed,
      analyze: false,
      stance: true,
      bias: false,
      summarization: false,
      about: false
    })
  }

  biasSelection = () => {
    console.log('Bias is triggered');
    this.props.history.push("/bias");
    this.setState( {
      collapsed: this.state.collapsed,
      analyze: false,
      stance: false,
      bias: true,
      summarization: false,
      about: false
    })
  }

  summarizationSelected = () => {
    console.log('Summarization is triggered');
    this.props.history.push("/summarization");
    this.setState( {
      collapsed: this.state.collapsed,
      analyze: false,
      stance: false,
      bias: false,
      summarization: true,
      about: false
    })
  }

  aboutSelected = () => {
    console.log('Summarization is triggered');
    this.props.history.push("/about");
    this.setState( {
      collapsed: this.state.collapsed,
      analyze: false,
      stance: false,
      bias: false,
      summarization: false,
      about: true
    })
  }

  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item onClick={this.analyzeSelected} key="1">
                <Icon type="area-chart" />
                <span>Analyze News</span>
              </Menu.Item>
              <Menu.Item onClick={this.stanceSelected} key="2">
                <Icon type="pie-chart" />
                <span>Stance</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span>Bias</span></span>}
              >
                <Menu.Item onClick={this.biasSelection} key="4">Lexicon-based</Menu.Item>
              </SubMenu>

              <Menu.Item onClick={this.summarizationSelected} key="3">
                <Icon type="desktop" />
                <span>Summerization</span>
              </Menu.Item>

              <Menu.Item onClick={this.aboutSelected} key="9">
                <Icon type="file" />
                <span>About</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header >
              <font color='#a0acbc'>Fake News Detection </font>
            </Header>
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
                {this.props.children}
              </div>
              {/*<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                { this.renderAppropriate() }
              </div>*/}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(LayoutPage);
