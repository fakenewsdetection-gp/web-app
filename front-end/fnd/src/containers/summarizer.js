import React, { Component } from 'react'
import { Card } from 'antd'

import 'antd/dist/antd.css';

class SummarizerPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card title="Summarization" bordered={false}>
        Summarization tab!!
      </Card>
    );
  }
}

export default SummarizerPage;
