import React, { Component } from 'react'
import { Card } from 'antd'

import 'antd/dist/antd.css';

class AnalyzePage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Card title="Analyze" bordered={false}>
          Analyze tab!!
        </Card>
    );
  }
}

export default AnalyzePage;
