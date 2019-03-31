import Model from '../core/model'
import Right from './right'
import User from './user'

const Role = new Model({

  tableName: 'roles',

  rules: {
    title: 'required'
  },

  virtuals: {},

  rights() {
    return this.belongsToMany(Right)
  },

  users() {
    return this.belongsToMany(User)
  }

})

export default Role
