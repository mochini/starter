import reducer from './reducer'
import { expect } from 'chai'
import React from 'react'

describe('src/app/components/drawer/reducer', () => {

  it('opens drawer', async () => {

    const state = reducer(undefined, {
      type: 'OPEN',
      component: <div>foo</div>,
      location: 'left'
    })

    expect(state).to.eql({
      component: <div>foo</div>,
      location: 'left',
      open: true

    })

  })

  it('closes drawer', async () => {

    const state = reducer(undefined, {
      type: 'CLOSE'
    })

    expect(state).to.deep.equal({
      component: null,
      location: null,
      open: false

    })

  })

  it('clears drawer', async () => {

    const state = reducer(undefined, {
      type: 'CLEAR'
    })

    expect(state).to.deep.equal({
      component: null,
      location: null,
      open: false
    })

  })

})
