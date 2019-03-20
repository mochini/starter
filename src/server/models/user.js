import bcrypt from 'bcrypt-nodejs'
import Model from './model'

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
  }

})

export default User
