import React from 'react'
import { connect } from 'react-redux'
import { withRouter }  from 'react-router'
import ReactMarkdown from 'react-markdown'

class ArticleView extends React.Component {
  render() {
    console.log(this)
    return (
      <div>
        <h1>{this.props.passage.title}</h1>
        <ReactMarkdown source={ this.props.passage.content }/>
        <p>创建于: {this.props.passage.createTime} </p>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    passage: state.list.selectedItem
  }
}

export default withRouter(connect(mapStateToProps)(ArticleView))