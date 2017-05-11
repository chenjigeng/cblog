import React from 'react'
import List from '../components/article/ArticleList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as listActions from '../actions/listAction'
import { withRouter } from 'react-router'

class ListContainer extends React.Component {
  render() {
    console.log(this)
    return (
      <List 
        data={this.props.list}
        actions={this.props.actions}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    list: state.list
  }
}

function mapActionToProps(dispatch) {
  return {
    actions: bindActionCreators(listActions, dispatch)
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapActionToProps
)(ListContainer))