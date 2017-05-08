import React from 'react'
import { Spin } from 'antd'

export default class List extends React.Component {
  componentDidMount() {
    const {store} = this.context;
    console.log(store)
    console.log(this)
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
        <div>
          <h1>文章列表</h1>
          {
            this.props.data.items.map( (item, index) => {
              return (
                <div key={index}>
                  <div>{index}</div>
                  <div>{item.title}</div>
                </div>
              )
            })
          }
        </div> 
      )
    }
  }
}