import * as types from '../../constants'
import target from '../detail'

describe('reducer::detail', () => {
  it('has a default state', () => {
    expect(target(undefined, {})).toEqual({
      data: {},
      error: ''
    })
  })

  it('handles COMPLAINT_DETAIL_FAILED actions', () => {
    const action = {
      type: types.COMPLAINT_DETAIL_FAILED,
      error: 'foo bar'
    }
    expect(target({}, action)).toEqual({
      data: {},
      error: 'foo bar'
    })
  })
})
