import React, { Component } from 'react'
import { Card } from 'antd'

import 'antd/dist/antd.css';

class BiasPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card title="Bias" bordered={false}>
        Bias tab!!
      </Card>
    );
  }
}

export default BiasPage;
