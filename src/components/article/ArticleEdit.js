import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Button, Input, message, Modal } from 'antd'
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
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({
      input: value
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
    if (this.props && this.props.passage) {
      let title = (this.props.passage && this.props.passage.title ) || '';
      let text = (this.props.passage && this.props.passage.content ) || '';
      return (
        <div>
          <h1 className='mb-20'>创建文章/编辑文章</h1>

          <div className='edit'>
            <Input 
              ref='title' 
              placeholder='请输入标题' 
              className='mb-20 fs-16' 
              size='large'
              value={title}
              onChange={ this.handleChange }
            />
            <textarea
              ref='content'
              className='markdown-editor'
              value={ text }
              onChange={ this.handleChange }
            />
            <ReactMarkdown source={ text } className='markdown p-10 result'/>
          </div>
          <div className='btn-group fr mt-20'>
            <Button type='primary' size='large' className='mr-15' onClick={ this.handleCreate }>创建</Button>
            <Button type='danger' size='large'>取消</Button>
          </div>
        </div>
      )
    } else {
      this.props.actions
        .fetchPassage(
          this.props.match.params.pid
        )
        .then( data => {
          console.log(data)
          if (data.data.status === 404) {
            message.error('文章不存在')
            this.props.history.push('/passage/list')
          }
        })
      return (
        <div></div>
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
