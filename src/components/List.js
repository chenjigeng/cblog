import React from 'react'
import { Spin } from 'antd'
import PropTypes from 'prop-types';
import '.././styles/components/list.css'

export default class List extends React.Component {
  componentDidMount() {
    this.props.actions.fetchPassage = this.props.actions.fetchPassage.bind(this);
    let content = this;
    this.props.actions.fetchPassage()
      .then(function(data) {
        console.log(data)
        console.log(content)
      })
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
                    <div className='title'>{item.title}</div>
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

List.PropTypes = {
  data: PropTypes.object,
  actions: PropTypes.object
}