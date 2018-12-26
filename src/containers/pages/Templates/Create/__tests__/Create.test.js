import React from 'react'
import { mount } from 'enzyme'
import App from '../../../../app'
import { Provider } from 'react-redux'
import { Route, MemoryRouter } from 'react-router'
import store, { history } from '../../../../../store'
import {pageHeads} from '../../../../layouts/Content/Main'
import {mockTemplateForm, mockReplacement, mockInputEvent} from '../../../../../mockData'
import * as actions from '../../../../../actions/template'
import {templateValidate} from '../../../../../utils/validate'

describe('Templates Create Component', () => {
  let component = null

  it('shuold render correctly', () => {
    component = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/templates/create']}>
          <App/>
        </MemoryRouter>
      </Provider>
    )
  })

  it('shuold render correct head', () => {
    expect(component.find('h2').at(0).text()).toEqual(pageHeads.template.create)
  })

  it('should render didmount call init post action', () => {
    expect(store.getState().templateForm).toEqual(mockTemplateForm)
  })

  it('should render Button disabled true', () => {
    expect(component.find('Button').at(0).prop('disabled')).toBe(true)
  })

  it('should not return post action that input invalidate', () => {
    const testInput = component.find('input').at(0)
    testInput.simulate('change', mockInputEvent(testInput.prop('name')))
    expect(component.find('Button').at(0).prop('onClick')).toBe(undefined)
  })

  // it('should return action that all input valid true', () => {
  //   const testTextarea = component.find('textarea').at(0)
  //   testTextarea.simulate('change', mockInputEvent(testTextarea.prop('name')))
  //   const testPostBtn = component.find('Button').at(0)
  //   testPostBtn.simulate('click')
  //   expect(testPostBtn.prop('onClick')()).toEqual(actions.fetchRequestPost(store.getState().templateForm))
  //   expect(templateValidate(store.getState().templateForm).finalPass).toEqual(true)
  // })

  it('should return action that reset replacements when click reset btn', () => {
    const testAddBtn = component.find('Button').at(2)
    testAddBtn.simulate('click')
    const testResetBtn = component.find('Button').at(1)
    testResetBtn.simulate('click')
    expect(component.find('tbody').children().length).toBe(0)
  })

  it('should return action that add replacement when click add btn', () => {
    const testAddBtn = component.find('Button').at(2)
    testAddBtn.simulate('click')
    testAddBtn.simulate('click')
    expect(component.find('tbody').children().length).toBe(2)
  })

  it('should return change store when edit replacements', () => {
    const beforeStore = {
      ...store.getState().templateForm
    }
    for(let i = 2; i < 6; i++) {
      const testInput = component.find('input').at(i)
      testInput.simulate('change', mockInputEvent(testInput.prop('name')))
    }
    expect(store.getState().templateForm).not.toEqual(beforeStore)
  })

  it('should return delete replacement action when click delete Button', () => {
    const testDelBtn = component.find('Button').at(2)
    testDelBtn.simulate('click')
    expect(component.find('tbody').children().length).toBe(1)
    expect(store.getState().templateForm.replacements[0]).toEqual(mockReplacement)
  })

  it('should not post that replacements invalid', () => {
    const testInput = component.find('input').at(2)
    const testPostBtn = component.find('Button').at(0)
    testInput.simulate('change', mockInputEvent(testInput.prop('name')))
    expect(testPostBtn.prop('onClick')).toBe(undefined)
  })

  it('should not post that empty replacement', () => {
    const testAddBtn = component.find('Button').at(3)
    const testPostBtn = component.find('Button').at(0)
    testAddBtn.simulate('click')
    expect(testPostBtn.prop('onClick')).toBe(undefined)
  })

  it('should use keyword in body, badge change', () => {
    const testInputBody = component.find('textarea').at(0)
    const testBadge = component.find('Badge')
    const mockKeyword = "keyword"
    const mockMaxbyte = 30
    testInputBody.simulate('change', mockInputEvent(testInputBody.prop('name'), `:${mockKeyword}:`))
    for(let i = 3; i < 6; i++) {
      const testInput = component.find('input').at(i)
      let value = ""
      if(i == 3) {
        value = mockKeyword
      } else if(i === 4) {
        value = mockMaxbyte
      }
      testInput.simulate('change', mockInputEvent(testInput.prop('name'), value))
    }
    expect(testBadge.text().slice(6,8)).toEqual(String(mockMaxbyte))
  })

})