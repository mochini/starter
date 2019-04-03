import bcrypt from 'bcrypt-nodejs'
import Model from '../core/model'
import Asset from './asset'
import Role from './role'

const User = new Model({

  tableName: 'users',

  rules: {
    first_name: 'required',
    last_name: 'required',
    email: ['email','unique']
  },

  virtuals: {

    full_name: function() {
      return `${this.get('first_name')} ${this.get('last_name')}`
    },

    rfc822: function() {
      return `${this.get('full_name')} <${this.get('email')}>`
    },

    first_initial: function() {
      return this.get('first_name') ? this.get('first_name')[0].toLowerCase() : ''
    },

    initials: function() {
      return this.get('first_initial') + this.get('last_initial')
    },

    last_initial: function() {
      return this.get('last_name') ? this.get('last_name')[0].toLowerCase() : ''
    },

    password: {
      get() {},
      set(value) {
        const password_salt = bcrypt.genSaltSync(10)
        this.set('password_salt', password_salt)
        this.set('password_hash', bcrypt.hashSync(value, password_salt))
      }
    }

  },

  authenticate(password) {
    return this.get('password_hash') === bcrypt.hashSync(password, this.get('password_salt'))
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  roles() {
    return this.belongsToMany(Role)
  }

})

export default User
