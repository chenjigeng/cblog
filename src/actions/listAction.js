import fetch from 'isomorphic-fetch'

//列表
export const requestPassages = () => {
  return {
    "type": "GET_LIST_BEGIN"
  }
}

export const receivePassages = (data) => {
  return {
    "type": "GET_LIST_SUCCESS",
    "data": data
  }
}

export const requestPassage = () => {
  return {
    "type": "GET_PASSAGE_BEGIN"
  }
}

export const receivePassage = (data) => {
  return {
    "type": "GET_PASSAGE_SUCCESS",
    "data": data
  }
}

export const fetchPassages = () => {
  return (dispatch, getState) => {
    dispatch(requestPassages());
    return fetch('/api/passage')
      .then( response => response.json())
      .then( json => 
        dispatch(receivePassages(json))
      )
  }
}


export const fetchPassage= (id) => {
  return (dispatch, getState) => {
    dispatch(requestPassage())
    return fetch(`/api/passage/${id}`)
      .then( response => response.json())
      .then( json => dispatch(receivePassage(json)))
  }
}

export const selectPassage = (data) => {
  return {
    "type": "SELECT_PASSAGE",
    data: data
  }
}

