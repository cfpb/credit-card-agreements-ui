/* eslint-disable camelcase */

import {
  API_CALLED, COMPLAINTS_FAILED, COMPLAINTS_RECEIVED
} from '../constants'

const defaultResults = {
  activeCall: '',
  doc_count: 0,
  error: '',
  lastUpdated: null,
  lastIndexed: null,
  hasDataIssue: false,
  isDataStale: false,
  isNarrativeStale: false,
  isLoading: false,
  items: [],
  total: 0
}

export default ( state = defaultResults, action ) => {
  switch ( action.type ) {
    case API_CALLED:
      return {
        ...state,
        activeCall: action.url,
        isLoading: true
      }

    case COMPLAINTS_RECEIVED: {
      const items = action.data.data

      return {
        ...state,
        activeCall: '',
        doc_count: items.length,
        error: '',
        isLoading: false,
        items: items
      }
    }

    case COMPLAINTS_FAILED:
      return {
        ...defaultResults,
        error: action.error
      }

    default:
      return state
  }
}
