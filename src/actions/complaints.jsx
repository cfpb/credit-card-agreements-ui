import * as types from '../constants'

// ----------------------------------------------------------------------------
// Action Creators

/**
* Calls the search endpoint of the API
*
* @returns {Promise} a chain of promises that will update the Redux store
*/
export function getComplaints() {
  return ( dispatch, getState ) => {
    const store = getState()
    const qs = store.query.queryString
    const uri = '@@API/credit/search/' + qs
    // const uri = 'https://www.mocky.io/v2/5a538b75300000f92b1ebfd9'

    // This call is already in process
    if( uri === store.results.activeCall )
      return null

    dispatch( callingApi( uri ) )
    return fetch( uri )
    .then( result => result.json() )
    .then( items => dispatch( programsReceived( items ) ) )
    .catch( error => dispatch( programsFailed( error ) ) )
  }
}

/**
* Calls the detail endpoint of the API
*
* @param {string} id the id of the complaint to retrieve
* @returns {Promise} a chain of promises that will update the Redux store
*/
export function getProgramDetail( id ) {
  return dispatch => {
    const uri = '@@API/credit/' + id
    dispatch( callingApi( uri ) )
    fetch( uri )
      .then( result => result.json() )
      .then( data => dispatch( programDetailReceived( data ) ) )
      .catch( error => dispatch( programDetailFailed( error ) ) )
  }
}

/**
* Notifies the application that an API call is happening
*
* @param {string} url the url being called
* @returns {string} a packaged payload to be used by Redux reducers
*/
export function callingApi( url ) {
  return {
    type: types.API_CALLED,
    url
  }
}

/**
* Creates an action in response to search results being received from the API
*
* @param {string} data the raw data returned from the API
* @returns {string} a packaged payload to be used by Redux reducers
*/
export function programsReceived( data ) {
  return {
    type: types.COMPLAINTS_RECEIVED,
    data
  }
}

/**
* Creates an action in response after a search fails
*
* @param {string} error the error returned from `fetch`, not the API
* @returns {string} a packaged payload to be used by Redux reducers
*/
export function programsFailed( error ) {
  return {
    type: types.COMPLAINTS_FAILED,
    error
  }
}

/**
* Creates an action in response to a complaint being received from the API
*
* @param {string} data the raw data returned from the API
* @returns {string} a packaged payload to be used by Redux reducers
*/
export function programDetailReceived( data ) {
  return {
    type: types.COMPLAINT_DETAIL_RECEIVED,
    data
  }
}

/**
* Creates an action in response after a detail search fails
*
* @param {string} error the error returned from `fetch`, not the API
* @returns {string} a packaged payload to be used by Redux reducers
*/
export function programDetailFailed( error ) {
  return {
    type: types.COMPLAINT_DETAIL_FAILED,
    error
  }
}
