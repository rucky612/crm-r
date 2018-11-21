import {TEMPLATES} from '../types'
import * as templateActions from '../template'

describe('template', () => {
  describe('actions', () => {
    it('should create actions', () => {
      const testQuery = '/test'
      const expectActions = {
        type: TEMPLATES.FETCH_REQUEST.GET,
        query: testQuery
      }
      expect(templateActions.fetchRequestGet(testQuery)).toEqual(expectActions)
    })
  })
})