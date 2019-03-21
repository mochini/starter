import i18n from 'i18n'
import path from 'path'

i18n.configure({
  locales:['en'],
  directory: path.resolve(__dirname, '..', '..', 'locales'),
  extension: '/server.json',
  api: {
    __: 't'
  }
})

export default i18n
