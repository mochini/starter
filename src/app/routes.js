import NotFound from './pages/not_found'
import Home from './pages/home'

const routes = [
  { path: '/page1', component: Home },
  { path: '/*', component: NotFound }

]

export default routes
