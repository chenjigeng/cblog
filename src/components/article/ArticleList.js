import React from 'react'
import { Spin } from 'antd'
import PropTypes from 'prop-types';
import '../../styles/components/list.css'
import { withRouter }  from 'react-router'

class ArticleList extends React.Component {
  componentDidMount() {
    this.props.actions.fetchPassage = this.props.actions.fetchPassage.bind(this);
    let content = this;
    this.props.actions.fetchPassages()
      .then(function(data) {
        console.log(data)
        console.log(content)
      })
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(id) {
    return () => {
      console.log(this)
      this.props.actions.selectPassage({
        "id": id
      })
      this.props.history.push(`/passage/${id}`)
    }
  }
  render() {
    if (this.props.data.loading) {
      return (
        <Spin />
      )
    } else {
      return (
        <div className='list'>
          <h1>文章列表</h1>
          <div className='content'>
            {
              this.props.data.items.map( (item, index) => {
                return (
                  <div key={index}>
                    <div className='title' onClick={this.handleClick(item.pid)}>{item.title}</div>
                    <div className='createTime'>{item.createTime}</div>
                  </div>
                )
              })
            }
          </div>
        </div> 
      )
    }
  }
}


ArticleList.PropTypes = {
  data: PropTypes.object,
  actions: PropTypes.object
}

export default withRouter(ArticleList)