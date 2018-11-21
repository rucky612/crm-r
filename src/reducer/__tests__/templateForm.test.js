import * as templateActions from '../../actions/template'
import { TEMPLATES } from '../../actions/types'
import reducer from '../templateForm'
import {URL, version} from '../../sagas/template'
import {mockTemplateForm, mockEdit, mockError, mockReplacement} from '../../mockData'

export let mockState = reducer(undefined, {})

describe('templates reducers', () => {

  beforeEach(() => {
  })

  it('should return initial state', () => {
    expect(mockState).toEqual(mockTemplateForm)
  })

  it('should error reset', () => {
    mockState = reducer(mockState, { type: TEMPLATES.ERROR_RESET })
    expect(mockState).toHaveProperty('error', null)
  })

  it('when post started, should return initital state', () => {
    mockState = reducer(mockState, templateActions.fetchRequestInitPost())
    expect(mockState).toEqual(mockTemplateForm)
  })

  it('when post or get one request, should return isloading true', () => {
    mockState = reducer(mockState, templateActions.fetchRequestGetOne())
    expect(mockState).toHaveProperty('isLoading', true)

    mockState = reducer(mockState, templateActions.fetchRequestPost())
    expect(mockState).toHaveProperty('isLoading', true)
  })

  it('when post or get one success, should return isloading false', () => {
    mockState = reducer(mockState, { type: TEMPLATES.FETCH_SUCCESS.GET_ONE })
    expect(mockState).toHaveProperty('isLoading', false)

    mockState = reducer(mockState, { type: TEMPLATES.FETCH_SUCCESS.POST })
    expect(mockState).toHaveProperty('isLoading', false)
  })

  it('when post or get one or put failure, should return isloading false end error', () => {
    mockState = reducer(mockState, {
      type: TEMPLATES.FETCH_FAIL.POST,
      error: mockError
    })
    expect(mockState).toHaveProperty('error', mockError)
    expect(mockState).toHaveProperty('isLoading', false)

    mockState = reducer(mockState, {
      type: TEMPLATES.FETCH_FAIL.PUT,
      error: mockError
    })
    expect(mockState).toHaveProperty('error', mockError)
    expect(mockState).toHaveProperty('isLoading', false)

    mockState = reducer(mockState, {
      type: TEMPLATES.FETCH_FAIL.GET_ONE,
      error: mockError
    })
    expect(mockState).toHaveProperty('error', mockError)
    expect(mockState).toHaveProperty('isLoading', false)
  })

  it('edit template should return value', () => {
    mockState = reducer(mockState, templateActions.editTemplate(mockEdit))
    expect(mockState).toHaveProperty(mockEdit.target.name, mockEdit.target.value)
  })

  it('should return add replacement', () => {
    mockState = reducer(mockState, templateActions.addReplacement())
    expect(mockState.replacements[0]).toEqual(mockReplacement)
    expect(mockState.replacements.length).toBe(1)

    mockState = reducer(mockState, templateActions.addReplacement())
    expect(mockState.replacements.length).toBe(2)

    mockState = reducer(mockState, templateActions.addReplacement())
    expect(mockState.replacements.length).toBe(3)
  })

  it('hould return edit replacement value', () => {
    const editIndex = 1
    mockState = reducer(mockState, templateActions.editReplacement(mockEdit, editIndex))
    expect(mockState.replacements[editIndex]).toHaveProperty(mockEdit.target.name, mockEdit.target.value)
  })

  it('should decrease replacements', () => {
    let editIndex = 1
    mockState = reducer(mockState, templateActions.removeReplacement(editIndex))
    expect(mockState.replacements).toEqual([mockReplacement, mockReplacement])
  })

  it('should reset replacements', () => {
    mockState = reducer(mockState, templateActions.resetReplacement())
    expect(mockState.replacements.length).toBe(0)
  })
})