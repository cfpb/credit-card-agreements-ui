import { COMPLAINTS_RECEIVED } from '../constants'

/* eslint-disable camelcase */

export const defaultAggs = {
  company: [],
  company_public_response: [],
  company_response: [],
  consumer_consent_provided: [],
  consumer_disputed: [],
  issue: [],
  product: [],
  state: [],
  submitted_via: [],
  tag: [],
  timely: [],
  zip_code: []
}

/* eslint-enable camelcase */

export default ( state = defaultAggs, action ) => {
  switch ( action.type ) {
    case COMPLAINTS_RECEIVED: {
      const programs = action.data.data
      const result = { ...state }

      programs.forEach( program => {
        result[program.slug] = program
      } )

      return result
    }

    default:
      return state
  }
}
