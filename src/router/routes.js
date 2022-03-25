const Login = () => import('@/views/login/login.vue')
const Main = () => import('@/views/main/main.vue')
const NotFound = () => import('@/views/not-found/not-found.vue')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    name: 'main',
    redirect: '/main/analysis/overview',
    path: '/main',
    component: Main,
    children: []
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: NotFound
  // },
]

export default routes;