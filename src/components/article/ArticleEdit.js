import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Button, Input, message, Modal, Spin } from 'antd'
import fetch from 'isomorphic-fetch'
import { withRouter } from 'react-router'
import { findDOMNode } from 'react-dom'
import * as listActions from '../../actions/listAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ArticleEdit extends React.Component {
  constructor() {
    super();
    this.value = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate= this.handleUpdate.bind(this)
    console.log(this)
    this.state = {
      passage: null
    }
  }

  handleChange(e) {
    let titleNode = findDOMNode(this.refs.title)
    let contentNode = findDOMNode(this.refs.content)
    this.setState({
      passage: {
        title: titleNode.value,
        content: contentNode.value
      }  
    })
  }

  handleUpdate() {
    let title = findDOMNode(this.refs.title).value
    let content = findDOMNode(this.refs.content).value
    if (title && content) {
      fetch('/api/passage', {
        method: 'PUT',
        body: JSON.stringify({
          'pid': this.props.match.params.pid,
          'title': title,
          'content': content
        })
      })
      .then( (res) => {
        if (res.status === 200) {
          message.info("更新成功")
          this.props.history.push('/passage/list')
        } else {
          message.error('更新失败，请稍后重试')
        }
      }, (res) => {
        Modal.error({
          title: '错误提示',
          content: '更新失败'
        })
        console.log(res);
      })
    } else {
      if (!title) {
        Modal.error({
          title: '错误提示',
          content: '请输入标题'
        })
      } else if (!content) {
        Modal.error({
          title: '错误提示',
          content: '请输入内容'
        })
      }
    }
  }

  render() {
    if (this.state && this.state.passage) {
      console.log(this.state.passage)
      return (
        <div>
          <h1 className='mb-20'>编辑文章</h1>

          <div className='edit'>
            <Input 
              ref='title' 
              placeholder='请输入标题' 
              className='mb-20 fs-16' 
              size='large'
              value={ this.state.passage.title }
              onChange={ this.handleChange }
            />
            <textarea
              ref='content'
              className='markdown-editor'
              value={ this.state.passage.content }
              onChange={ this.handleChange }
            />
            <ReactMarkdown source={ this.state.passage.content } className='markdown p-10 result'/>
          </div>
          <div className='btn-group fr mt-20'>
            <Button type='primary' size='large' className='mr-15' onClick={ this.handleUpdate }>更新</Button>
            <Button type='danger' size='large'>取消</Button>
          </div>
        </div>
      )
    } else if (this.props && !this.props.passage) {
      this.props.actions
        .fetchPassage(
          this.props.match.params.pid
        )
        .then( data => {
          console.log(data)
          if (data.data.status === 404) {
            message.error('文章不存在')
            this.props.history.push('/passage/list')
          } else if (data.data.status === 200) {
            this.setState({
              passage: {
                title: data.data.passage.title,
                content: data.data.passage.content
              }
            }, function() {
              console.log(this)
              console.log(this.state)
            })
          } else if (data.data.status === 500) {
            message.error('请检查网络状况，稍后重试')
            this.props.history.push('/home')
          }
        })
      return (
        <Spin />
      )
    } else {
      return (
        <Spin />
      )
    } 
  }
}

function mapStateToProps(state) {
  return {
    passage: state.list.selectedItem || null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(listActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleEdit))
