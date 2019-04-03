import Model from '../core/model'
import User from './user'

const Asset = new Model({

  tableName: 'assets',

  rules: {},

  virtuals: {

    identifier: function() {
      return this.get('file_size')+'-'+this.get('original_file_name').replace(/[^0-9a-zA-Z_-]/img, '')
    },

    path: function() {
      return (!this.isNew()) ? `/assets/${this.get('id')}/${this.get('file_name')}` : null
    },

    url: function() {
      return `/assets/${this.get('id')}/${this.get('file_name')}`
    }

  },

  user() {
    return this.hasOne(User, 'photo_id')
  }

})

export default Asset
