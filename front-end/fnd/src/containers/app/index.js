import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import LayoutPage from '../layout'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'


const App = () => (
  <div>
    <LayoutPage />
  </div>
)

export default App
