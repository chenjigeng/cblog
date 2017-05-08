import React from 'react'
import ReactMarkdown from 'react-markdown'
import '../../styles/components/article/index.css'
import { Button, Input, message } from 'antd'
import fetch from 'isomorphic-fetch'

class Article extends React.Component {
  constructor() {
    super();
    this.value = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    console.log(this)
  }

  componentDidMount() {
    this.setState({
      input: '# Hello'
    })
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({
      input: value
    })
  }

  handleCreate() {
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

        }
      }, (res) => {
        console.log(res);
      })
    }
  }

  render() {
    var text = (this.state && this.state.input) || '';
    return (
      <div>
        <h1 className='mb-20'>创建文章/编辑文章</h1>

        <div className='edit'>
          <Input ref='title' placeholder='请输入标题' className='mb-20 fs-16' size='large'/>
          <textarea
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
  }
}

export default Article