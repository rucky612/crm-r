import React from 'react'
import { mount, shallow } from 'enzyme'
import App from '../../../../app'
import Home from '../../../../pages/Templates/Home'
import { Provider } from 'react-redux'
import { Route, MemoryRouter } from 'react-router'
import store, { history } from '../../../../../store'
import { pageHeads } from '../../../../layouts/Content/Main'
import { mockHomeList } from '../../../../../mockData'
import * as actions from '../../../../../actions/template'
import nock from 'nock'
import { URL, version, getTemplateSaga } from '../../../../../sagas/template'
import { TEMPLATES } from '../../../../../actions/types'

describe('Templates Home Component', () => {
  let component = null
  const mockIndex = 100

  it('should render correctly', () => {
    component = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/templates/home']}>
          <App/>
        </MemoryRouter>
      </Provider>
    )

    store.dispatch({
      type: TEMPLATES.FETCH_SUCCESS.GET,
      response: { ...mockHomeList(mockIndex) }
    })
    component.update()
  })

  it('should render template list', () => {
    expect(component.find('tbody').children().length).toBe(mockIndex)
  })

  it('should ', () => {
  
  })


})