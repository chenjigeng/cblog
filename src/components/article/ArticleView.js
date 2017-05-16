import React from 'react'
import { connect } from 'react-redux'
import { withRouter }  from 'react-router'
import ReactMarkdown from 'react-markdown'
import { bindActionCreators } from 'redux'
import * as listActions from '../../actions/listAction'
import { Spin, message } from 'antd'

class ArticleView extends React.Component {

  constructor() {
    super()
    if (this.props && !this.props.passage) {
      console.log('123123')
    }
    console.log(123123)
    console.log(this)
  }

  render() {
    if (this.props && !this.props.passage) {
      this.props.actions
        .fetchPassage(this.props.match.params.pid)
        .then( (data) => {
          if (data.data.status === 404) {
            message.warning("文章不存在")
            this.props.history.push('/passage/list')
          }
        } )
      return (
        <Spin />
      )
    } else {
      return (
        <div>
          <h1>{this.props.passage.title}</h1>
          <p>{this.props.passage.content}</p>
        </div>
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

// export default ArticleView
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleView))