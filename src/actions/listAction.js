import fetch from 'isomorphic-fetch'

export const requestPassages = () => {
  return {
    "type": "GET_LIST_BEGIN"
  }
}

export const receivePassage = (data) => {
  return {
    "type": "GET_LIST_SUCCESS",
    "data": data
  }
}

export const fetchPassage = () => {
  return (dispatch, getState) => {
    dispatch(requestPassages());
    return fetch('/api/passage')
      .then( response => response.json())
      .then( json => 
        dispatch(receivePassage(json))
      )
  }
}