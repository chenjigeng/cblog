import { combineReducers } from 'redux'
import list from './list'

const initState = {
  lists: [
    {
      'title': '测试1',
      'createAt': new Date()
    },
    {
      'title': '测试2',
      'createAt': new Date()
    }
  ]
}

function posts(state = initState, action) {
  switch(action.type) {
    case 'update':
      return Object.assign({}, state, state.lists.concat(action.list)) 
    default:
      return state
  }
}

export default combineReducers({
  list,
  posts
})


