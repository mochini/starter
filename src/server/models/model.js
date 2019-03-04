import bookshelf from '../lib/bookshelf'
import Checkit from  'checkit'

class Model {

  constructor(options) {

    return bookshelf.Model.extend({

      hasTimestamps: true,

      initialize: function(attrs, opts) {

        this.on('saving', this.validateSave)

      },

      validateSave: function(model, attrs, saveOptions) {

        if(saveOptions.skipValidation) return true

        return new Checkit(this.rules).run(this.attributes, {
          tableName: this.tableName
        })

      },

      ...options

    })

  }

}

export default Model
