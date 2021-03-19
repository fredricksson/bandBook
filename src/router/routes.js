
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MyBooks.vue') },
      { path: 'myBooks', component: () => import('pages/MyBooks.vue') },
      { path: 'desiredBooks', component: () => import('pages/DesiredBook.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
