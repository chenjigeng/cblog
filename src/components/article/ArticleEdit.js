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
    let title = this.refs.title.refs.input.value
    if (title && this.state.input) {
      fetch('/api/passage', {
        method: 'POST',
        body: JSON.stringify({
          'title': title,
          'content': this.state.input
        })
      })
      .then( (res) => {
        if (res.status === 200) {
          message.info("创建成功")
          this.props.history.push('/list')
        } else {
          message.error('创建失败，请稍后重试')
        }
      }, (res) => {
        Modal.error({
          title: '错误提示',
          content: '创建失败'
        })
        console.log(res);
      })
    } else {
      if (!title) {
        Modal.error({
          title: '错误提示',
          content: '请输入标题'
        })
      } else if (!this.state.input) {
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
          <h1 className='mb-20'>创建文章/编辑文章</h1>

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
            <Button type='primary' size='large' className='mr-15' onClick={ this.handleCreate }>创建</Button>
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
