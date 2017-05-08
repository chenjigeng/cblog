import React from 'react'

class NotFound extends React.Component {
  constructor() {
    super()
    console.log(this)
  }
  render() {
    return (
      <div>访问的页面没有找到</div>
    )
  }
}

export default NotFound