export default {
  ssr: false,

  head: {
    title: 'deposit-page',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
    ]
  },

  css: [
    '~assets/global'
  ],

  plugins: [
    { src: '~/plugins/directives', ssr: false }
  ],

  buildModules: [
    '@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: '/'
  },

  build: {
  }
}
