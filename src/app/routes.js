import NotFound from './pages/not_found'
import RoleList from './pages/roles/list'
import RoleShow from './pages/roles/show'
import UserList from './pages/users/list'
import UserShow from './pages/users/show'

const routes = [
  { path: '/roles', component: RoleList },
  { path: '/roles/:id', component: RoleShow },
  { path: '/users', component: UserList },
  { path: '/users/:id', component: UserShow },
  { path: '/*', component: NotFound}
]

export default routes
