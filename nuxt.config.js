const pkg = require('./package')
const webpack = require('webpack')
require('dotenv').config()

module.exports = {
  mode: 'universal',
  head: {
    title: 'ノーブル',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,minimum-scale=1, maximum-scale=1'
      },
      {
        name: 'description',
        content: '優れた機能とデザインを雇用する令和を象徴する最新ネット小説投稿・閲覧サイトである。'
      },
      {
        name: 'title',
        content: '最新WEB小説投稿・閲覧サイト ノーブル'
      },
      {
        property: "og:type",
        content: 'website'
      },
      {
        property: "og:url",
        content: 'https://nobles.jp'
      },
      {
        property: "og:title",
        content: '最新WEB小説投稿・閲覧サイト ノーブルp'
      },
      {
        property: 'og:description',
        content: '優れた機能とデザインを雇用する令和を象徴する最新ネット小説投稿・閲覧サイトである。'
      },

    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
      src: '/js/fb-sdk.js'
    }, {
      src: '/js/gg-sdk.js'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {

    color: '#af9bd0',
    height: '3px',
    continuous: true
  },
  generate: {
    routes: [
      '/ads.txt',
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    "assets/css/index.css",
    "assets/css/main.scss",
    'vue-loaders/dist/vue-loaders.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/intercept',
    {
      src: '~plugins/vue-star-rating',
      ssr: false
    },
    {
      src: '~/plugins/swiper',
      ssr: false
    },
    {
      ssr: false,
      src: '~/plugins/avatar'
    },
    {
      ssr: false,
      src: '~/plugins/swipeTab'
    },
    {
      ssr: false,
      src: "~plugins/clickOutside"
    }, {
      ssr: false,
      src: "~plugins/vueEditor"
    }, {
      src: '@/plugins/vueMask',
      ssr: false
    }, {
      src: '@/plugins/zondiIcon',
      ssr: false
    }, {
      src: '@/plugins/elementLoading',
      ssr: false
    },
    {
      src: '@/plugins/pull-to',
      ssr: false
    },
    {
      src: '@/plugins/datePicker',
      ssr: false
    }, {
      src: '@/plugins/vuelineclamp',
      ssr: false
    }, {
      src: '@/plugins/graphs',
      ssr: false
    }, {
      src: '@/plugins/infinite',
      ssr: false
    }, {
      src: '@/plugins/vueClamp',
      ssr: false
    }, {
      src: '@/plugins/watchMedia',
      ssr: false
    }, {
      src: '@/plugins/scrollama',
      ssr: false
    }, {
      src: '@/plugins/countTo',
      ssr: false
    }, {
      src: '@/plugins/skeleton',
      ssr: false
    }, {
      src: '@/plugins/gAuth',
      ssr: false,
    }, {
      src: '@/plugins/epicSpinners',
      ssr: false,
    },
    {
      src: '@/plugins/installer',
      ssr: false,
    },
    {
      src: '@/plugins/auth',
    },
    {
      src: '@/plugins/hydrate',
    }

  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/vuetify', {
      treeShake: true
    }],
    '@nuxtjs/pwa',
    'nuxt-device-detect',
    'nuxt-webfontloader',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',

    ['nuxt-validate', {
      lang: 'ja',
    }],
    ['@nuxtjs/robots', {
      UserAgent: '*',
      Disallow: '/',
      UserAgent: 'Googlebot',
      Disallow: '',
      UserAgent: 'Yahoo-slurp',
      Disallow: '',
      UserAgent: 'Msnbot',
      Disallow: ''
    }],
    ['@nuxtjs/moment', {
      locales: ['ja'],
      defaultLocale: 'ja'
    }],
    ['@nuxtjs/component-cache', {
      maxAge: 1000 * 60 * 60
    }],
    ['@nuxtjs/google-adsense', {
      id: 'pub-4438410171989811',
      pageLevelAds: false,
      test: true,

    }],
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [{
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }, {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far']
      }, {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }]
    }],
    ['@nuxtjs/google-analytics', {
      id: 'UA-119733183-2',
      autoTracking: {
        page: true
      }
    }],
    ['@nuxtjs/universal-storage', {
      storage: {
        vuex: true, // boolean or {namespace}
        localStorage: true, // boolean or {prefix }
        cookie: true, // boolean or {prefix, options }
        initialState: {}, // Object {}
        ignoreExceptions: true //
      }
    }],
    ['@nuxtjs/dotenv', {
      /* module options */
    }],
    ['@nuxtjs/recaptcha', {
      siteKey: '6LcZRq4UAAAAAL74nLSlaPqv10TJXVxhzyANs49_',
      version: 2,
      language: 'ja',
      hideBadge: true
    }],
    ['@nuxtjs/toast', {
      position: 'top-right',
      duration: 5000
    }],
    ['nuxt-stripe-module', {
      publishableKey: process.env.STRIPE_KEY || 'pk_live_2WoTAiPewhp9sgG6DsTE09uF',
      version: 'v3', // Default
    }],
    "nuxt-compress",
  ],
  axios: {
    baseURL: process.env.SERVER_URL + '/v1'
  },
  auth: {
    strategies: {
      google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        user: false,
        redirect_uri: process.env.REDIRECT_URI
      },
      facebook: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        userinfo_endpoint: false,
        scope: ['public_profile', 'email'],
        redirect_uri: process.env.REDIRECT_URI
      },
      local: {
        _scheme: '~/auth/local.js',
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'post',
            propertyName: false
          },
          user: {
            url: 'user/show',
            method: 'get',
            propertyName: false
          },
          logout: false
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/',
      home: '/'
    },
    plugins: ['~/plugins/auth.js']
  },
  router: {
    middleware: ['auth'],
    linkActiveClass: 'active-link'
  },
  webfontloader: {
    google: {
      families: ['IBM Plex Sans:300,400,700', 'Noto Sans JP:400,500', 'Sniglet:400,800', 'Kosugi:400,500'] //Loads Lato font with weights 400 and 700
    }
  },
  'manifest': {
    name: 'ノーブル　小説',
    short_name: 'ノーブル',
    lang: 'ja',
    theme_color: "#AF9BD0",
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.unshift({
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'responsive-loader',
          options: {
            // disable: isDev,
            placeholder: true,
            quality: 85,
            placeholderSize: 30,
            name: 'img/[name].[hash:hex:7].[width].[ext]',
            adapter: require('responsive-loader/sharp')
          }
        }
      })
      // remove old pattern from the older loader
      config.module.rules.forEach(value => {
        if (String(value.test) === String(/\.(png|jpe?g|gif|svg|webp)$/)) {
          // reduce to svg and webp, as other images are handled above
          value.test = /\.(svg|webp)$/
          // keep the configuration from image-webpack-loader here unchanged
        }
      })
    },
    splitChunks: {
      layouts: true
    },
    extractCSS: true,
    styleResources: {
      sass: ['./assets/css/abstracts/main.scss']
    },
    transpile: ['vue-clamp', 'resize-detector', 'lodash-es'],
    postcss: {
      plugins: [
        require('postcss-gap-properties')(),
        require('autoprefixer')({
          grid: true,
          flexbox: true,
          stats: {
            warnings: false
          }
        })
      ]

    },
    plugins: [new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })]
  },
  server: {
    port: 8080,
    host: '0.0.0.0'
  },
}
