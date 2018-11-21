import { TEMPLATES } from '../../actions/types'
import * as actions from '../../actions/template'
import { put, call } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import axios from 'axios'
import * as saga from '../template'
import errorMessage from '../errorMessage'
import {mockTemplateList, mockTemplateForm, mockError, testTemplateForm} from '../../mockData'
import {history} from '../../store'

const URL = `${saga.URL}/apis/${saga.version}/templates`
const mockQuery = `?limit=10&offset=0`

describe('saga', () => {
  describe('post request', () => {
    const gen = cloneableGenerator(saga.postTemplateSaga)(actions.fetchRequestPost(testTemplateForm))
    
    it('should return success', () => {
      const clone = gen.clone()
      const mockPostTemp = saga.checkEmptyString(testTemplateForm)
      expect(clone.next().value).toEqual(call(axios.post, URL, mockPostTemp))
    })
    
    it('should return success action', () => {
      const clone = gen.clone()
      clone.next()
      expect(clone.next().value).toEqual(put({
        type: TEMPLATES.FETCH_SUCCESS.POST
      }))
    })

    it('should return history push template home', () => {
      const clone = gen.clone()
      clone.next()
      clone.next()
      expect(clone.next().value).toEqual(call(history.push, '/templates/home'))
    })

    it('should return error', () => {
      const clone = gen.clone()
      clone.next()
      expect(clone.throw(mockError).value).toEqual(put({
        type: TEMPLATES.FETCH_FAIL.POST,
        error: errorMessage(mockError)
      }))
    })

    it('should return error reset', () => {
      const clone = gen.clone()
      clone.next()
      clone.throw(mockError)
      expect(clone.next().value).toEqual(put({
        type: TEMPLATES.ERROR_RESET
      }))
    })
  })
  
  describe('get request', () => {
    const gen = cloneableGenerator(saga.getTemplateSaga)(actions.fetchRequestGet(mockQuery))
    gen.next()

    it('should return success response', () => {
      const clone = gen.clone()
      const fakeResponse = {
        ...mockTemplateList,
        rows: [
          mockTemplateForm,
          mockTemplateForm
        ],
        count: 2
      }
      expect(clone.next({data: fakeResponse}).value).toEqual(put({
        type: TEMPLATES.FETCH_SUCCESS.GET,
        response: fakeResponse
      }))
      expect(clone.next().value).toEqual(put({
        type: TEMPLATES.ERROR_RESET
      }))
    })

    it('should return error response', () => {
      const clone = gen.clone()
      expect(clone.throw(mockError).value).toEqual(put({
        type: TEMPLATES.FETCH_FAIL.GET,
        error: errorMessage(mockError)
      }))
    })

    it('should return error reset', () => {
      const clone = gen.clone()
      clone.next()
      expect(clone.next().value).toEqual(put({
        type: TEMPLATES.ERROR_RESET
      }))
    })
  })
  
  describe('get one request', () => {
    const gen = cloneableGenerator(saga.getOneTemplateSaga)(actions.fetchRequestGetOne(1))
    gen.next()

    it('should return success response', () => {
      const clone = gen.clone()
      const fakeResponse = {
        row: mockTemplateForm
      }
      expect(clone.next({data: fakeResponse}).value).toEqual(put({
        type: TEMPLATES.FETCH_SUCCESS.GET_ONE,
        response: fakeResponse.row
      }))
    })

    it('should return error response', () => {
      const clone = gen.clone()
      expect(clone.throw(mockError).value).toEqual(put({
        type: TEMPLATES.FETCH_FAIL.GET_ONE,
        error: errorMessage(mockError)
      }))
    })

    it('should return error reset', () => {
      const clone = gen.clone()
      clone.next()
      expect(clone.next().value).toEqual(put({
        type: TEMPLATES.ERROR_RESET
      }))
    })
  })

  describe('put request', () => {
    const putQuery = 1
    const gen = cloneableGenerator(saga.putOneTemplateSaga)(actions.fetchRequestPut(putQuery, testTemplateForm))

    it('should return put template', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(call(axios.put, `${URL}/${putQuery}`, saga.checkEmptyString(testTemplateForm)))
    })

    it('should history go back', () => {
      const clone = gen.clone()
      clone.next()
      expect(clone.next().value).toEqual(call(history.goBack))
    })

    it('should return put error', () => {
      const clone = gen.clone()
      clone.next()
      expect(clone.throw(mockError).value).toEqual(put({
        type: TEMPLATES.FETCH_FAIL.PUT,
        error: errorMessage(mockError)
      }))
    })

    it('should return put error reset', () => {
      const clone = gen.clone()
      clone.next()
      clone.next()
      expect(clone.next().value).toEqual(put({
        type: TEMPLATES.ERROR_RESET
      }))
    })
  })

  describe ('delete one template request', () => {
    const deleteQuery = 1
    const gen = cloneableGenerator(saga.removeOneTemplateSaga)(actions.fetchRequestDelete(deleteQuery, mockQuery))

    it('should return delete action', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(call(axios.delete, `${URL}/${deleteQuery}`))
    })

    it('should return getTemplateSaga', () => {
      const clone = gen.clone()
      clone.next()
      expect(clone.next().value).toEqual(call(saga.getTemplateSaga, {query: mockQuery}))
    })

    it('should return delete error', () => {
      const clone = gen.clone()
      clone.next()
      expect(clone.throw(mockError).value).toEqual(put({
        type: TEMPLATES.FETCH_FAIL.DELETE,
        error: errorMessage(mockError)
      }))
    })

    it('should return put error reset', () => {
      const clone = gen.clone()
      clone.next()
      clone.throw(mockError)
      expect(clone.next().value).toEqual(put({
        type: TEMPLATES.ERROR_RESET
      }))
    })
  })
})