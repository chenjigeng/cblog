const initState = {
  "dirty": false,
  "items": [],
  "loading": true
}

function list(state = initState, action) {
  switch(action.type) {
    case 'GET_LIST_BEGIN':
      return Object.assign({}, state, {"loading": true})
    case 'GET_LIST_SUCCESS':
      return Object.assign({}, state, { "items" : action.data, "loading": false })
    default:
      return state
  }
}

export default list