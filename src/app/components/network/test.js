import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Network from './network.js'

describe('src/app/components/network', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/network.js', () => {

    it('renders', async () => {

      const network = shallow(<Network />)

      expect(network.is('div.network')).to.be.true

    })

  })


})
