import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>热门文章</h1>
      </div>
    )
  }
}

Home.PropTypes = {
  state: PropTypes.object,
  actions: PropTypes.object
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))