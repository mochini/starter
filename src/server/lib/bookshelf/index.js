import filter from './filter'
import sort from './sort'
import pagination from './fetch_page'
import Bookshelf from 'bookshelf'
import knex from '../knex'

const bookshelf = Bookshelf(knex)

bookshelf.plugin('virtuals')

bookshelf.plugin(filter)

bookshelf.plugin(sort)

bookshelf.plugin(pagination)

export default bookshelf
