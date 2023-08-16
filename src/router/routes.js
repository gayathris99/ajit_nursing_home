
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'about-us', name: 'about-us', component: () => import('pages/AboutUs.vue') },
      { path: 'blogs/:id', name: 'individual-blog', component: () => import('pages/IndividualBlogs.vue') },
      { path: 'faq', name: 'faq', component: () => import('pages/FaqPage.vue') },
      { path: 'terms', name: 'terms', component: () => import('pages/TermsAndCondition.vue') },
      { path: 'privacy', name: 'privacy', component: () => import('pages/PrivacyPolicy.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
