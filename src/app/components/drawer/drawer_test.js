import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import Drawer from './drawer'

describe('src/app/components/drawer/drawer', () => {

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
