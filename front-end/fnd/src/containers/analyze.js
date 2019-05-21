import React, { Component } from 'react'
import { Card, Input, Form, Col, Row, Upload, message, Button, Icon } from 'antd'
import { getTodos } from '../actions';

import 'antd/dist/antd.css';

const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class AnalyzePage extends Component {

  state = {
    uploadBody: false
  }

  constructor(props) {
    super(props)
  }

  handleSubmit = (e) => {
    console.log('Submission button triggered!');
    var todos =  getTodos();
    console.log(todos);
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
     if (!err) {
       console.log('Received values of form: ', values);
     }
     });
  }

  handleUpload = () => {
    console.log('Uploading Triggered!');
    this.setState({uploadBody: true})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Card title="Analyze" bordered={false}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Form.Item
                label="Headline(Optional)"
                validateStatus="success"
              >

              <Input placeholder="Enter the headline/title of the article" id="error" />
              </Form.Item>
            </Row>
            <Row gutter={16}>
                <Form.Item
                  label="Body(*)"
                >
                  {getFieldDecorator('userName', {
                              rules: [{ required: !this.state.uploadBody, message: 'Please enter the body of the article!' }],
                            })(
                              <TextArea rows={7} placeholder="Enter the body of the article" id="error"/>
                            )}
                </Form.Item>
            </Row>
            <Row gutter={16}>
                <Form.Item
                  label="or Upload body"
                  validateStatus="success"
                >
                  <Upload {...props}>
                    <Button onClick={this.handleUpload}>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload>
                </Form.Item>
            </Row>
            <Row>
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Row>
          </Form>
        </Card>
    );
  }
}

const WrappedAnalyzeForm = Form.create({ name: 'analyze' })(AnalyzePage);


export default WrappedAnalyzeForm;
