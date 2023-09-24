
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      // { path: 'blogs', name: 'blogs', component: () => import('pages/AllBlogs.vue') },
      { path: ':tabTitle/:tabId', name: 'tab-blogs', component: () => import('pages/PopularTabBlogs.vue'), props: true },
      { path: 'blogs/:id', name: 'individual-blog', component: () => import('pages/IndividualBlogs.vue') },
      { path: 'faq', name: 'faq', component: () => import('pages/FaqPage.vue') },
      { path: 'terms', name: 'terms', component: () => import('pages/TermsAndCondition.vue') },
      { path: 'privacy', name: 'privacy', component: () => import('pages/PrivacyPolicy.vue') },
      { path: 'make-an-appointment', name: 'appointment', component: () => import('pages/AppointmentPage.vue') }
    ]
  },
  {
    path: '/hospital',
    component: () => import('layouts/HospitalLayout.vue'),
    redirect: { name: 'about-us' },
    children: [
      { path: 'about-us', name: 'about-us', component: () => import('pages/AboutUs.vue') },
      { path: 'our-doctors', name: 'our-doctors', component: () => import('pages/OurDoctors.vue') },
    ]
  },
  // {
  //   path: '/women-wellness',
  //   component: () => import('layouts/WomenWellness.vue'),
  //   // redirect: { name: 'about-us' },
  //   children: [
  //     { path: ':tabTitle/:tabId', name: 'tab-blogs', component: () => import('pages/PopularTabBlogs.vue'), props: true },
  //     // { path: 'about-us', name: 'about-us', component: () => import('pages/AboutUs.vue') },
  //     // { path: 'our-doctors', name: 'our-doctors', component: () => import('pages/OurDoctors.vue') },
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
