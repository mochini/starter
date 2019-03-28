import NotFound from './pages/not_found'
import List from './pages/list'
import Show from './pages/show'

const routes = [
  { path: '/users', component: List },
  { path: '/users/:id', component: Show },
  { path: '/page1', component: List },
  { path: '/*', component: NotFound }

]

export default routes
