import { shallow } from 'enzyme'
import * as actions from './actions'
import reducer from './reducer'
import Drawer from './drawer'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'

describe('src/web/components/drawer', () => {

  describe('/actions', () => {

    it('dispatches open', () => {

      const result = actions.open(1, 'left')

      expect(result).to.be.eql({
        type: 'OPEN',
        component: 1,
        location: 'left'
      })

    })

    it('dispatches close', () => {

      const result = actions.close()

      expect(result).to.be.eql({
        type: 'CLOSE'
      })

    })

    it('dispatches clear', () => {

      const result = actions.clear()

      expect(result).to.be.eql({
        type: 'CLEAR'
      })

    })

  })

  describe('/drawer', () => {

    it('renders with a default state', () => {

      const drawer = shallow(
        <Drawer location="right">
          <div className="foo" />
        </Drawer>
      )

      expect(drawer.is('div.drawer')).to.be.true

      const child = drawer.childAt(0)
      expect(child.is('div.foo')).to.be.true

    })

    it('renders open with a component', () => {

      const component = <div className="foo" />

      const drawer = shallow(<Drawer component={ component } location="right" open={ true } />)

      const overlay = drawer.childAt(0).childAt(0)
      expect(overlay.is('div.drawer-overlay')).to.be.true

      const panel = drawer.childAt(1).childAt(0)
      expect(panel.is('div.drawer-panel.drawer-panel-right')).to.be.true

      const comp = panel.childAt(0)
      expect(comp.is('div.foo')).to.be.true

    })

    it('handles close on clicked overlay', () => {

      const onClose = spy()

      const drawer = shallow(<Drawer onClose={ onClose } />)

      const overlay = drawer.childAt(0).childAt(0)
      overlay.simulate('click')
      expect(onClose.calledOnce).to.be.true

    })

    it('calls onClear', (done) => {

      const onClear = spy()

      const drawer = shallow(<Drawer open={ true } onClear={ onClear } />)

      drawer.setProps({ open: false })

      setTimeout(() => {
        expect(onClear.calledOnce).to.be.true
        done()
      }, 500)

    })

  })

  describe('/reducer', () => {

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

})
