import Model from '../core/model'
import Role from './role'

const Right = new Model({

  tableName: 'roles',

  rules: {
    title: 'required'
  },

  virtuals: {},

  roles() {
    return this.belongsToMany(Role)
  }

})

export default Right
