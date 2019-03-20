import i18n from 'i18n'
import path from 'path'

i18n.configure({
  locales:['en'],
  directory: path.resolve(__dirname, '..', 'locales')
})

export default i18n
