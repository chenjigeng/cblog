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

export const rejectPassage = (data) => {
  return {
    "type": "GET_PASSAGE_ERROR",
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


export const fetchPassage = (id) => {
  return (dispatch, getState) => {
    dispatch(requestPassage())
    return fetch(`/api/passage/${id}`)
      .then( response => {
        console.log(response)
        if (response.status === 500) {
          let data =  {
            status: 500,
            message: '请检查网络情况'
          }
          return data;
        }
        return response.json()
      }, reject => {
        console.log(reject)
      })
      .then( json => {
        if (json.status === 500) {
          return dispatch(rejectPassage(json))
        }
        console.log(json)
        return dispatch(receivePassage(json))
      })
  }
}

export const selectPassage = (data) => {
  return {
    "type": "SELECT_PASSAGE",
    data: data
  }
}

