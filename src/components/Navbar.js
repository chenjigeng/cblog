import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { Layout } from 'antd'
import '../styles/components/Navbar.css'
const { Header} = Layout

export default class Navbar extends React.Component {
  render() {
    return (
      <Header className='header'>
        <div className="logo">陈纪庚的博客</div>
        <Menu 
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='home'>
            <Link to='/home'>
              <Icon type='home'/> 主页
            </Link>
          </Menu.Item>
          <Menu.Item key='list'>
            <Link to='/list'>
              <Icon type='mail'/> 文章列表
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/create'>
              <Icon type='plus-circle' /> 创建文章
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
        
    )
  }
}