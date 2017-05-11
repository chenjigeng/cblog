const initState = {
  "dirty": false,
  "items": [],
  "loading": true,
  "selectedItem": null
}

function list(state = initState, action) {
  switch(action.type) {
    case 'GET_LIST_BEGIN':
      return Object.assign({}, state, {"loading": true})
    case 'GET_LIST_SUCCESS':
      return Object.assign({}, state, { "items" : action.data, "loading": false })
    case 'SELECT_PASSAGE':
      return Object.assign({}, state, {selectedItem: state.items[action.data.id]})
    default:
      return state
  }
}

export default list