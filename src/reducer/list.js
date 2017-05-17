const initState = {
  "dirty": false,
  "items": [],
  "loading": true,
  "selectedItem": null,
  "error": ""
}

function list(state = initState, action) {
  switch(action.type) {
    case 'GET_LIST_BEGIN':
      return Object.assign({}, state, {"loading": true})
    case 'GET_LIST_SUCCESS':
      return Object.assign({}, state, { "items" : action.data, "loading": false })
    case 'SELECT_PASSAGE':
      return Object.assign({}, state, {selectedItem: state.items.filter((item) => {
        return item.pid === action.data.id
      })[0]})
    case 'GET_PASSAGE_BEGIN':
      return Object.assign({}, state, {"loading": true})
    case 'GET_PASSAGE_SUCCESS':
      return Object.assign({}, state, { "selectedItem" : action.data.passage, "loading": false })
    case 'GET_PASSAGE_ERROR':
      return Object.assign({}, state, { "loading": false, "error": action.data.message })
    default:
      return state
  }
}

export default list