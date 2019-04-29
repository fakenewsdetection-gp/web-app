import React, { Component } from 'react'
import { Card } from 'antd'

import 'antd/dist/antd.css';

class StancePage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card title="Stance" bordered={false}>
        Stance tab!!
      </Card>
    );
  }
}

export default StancePage;
