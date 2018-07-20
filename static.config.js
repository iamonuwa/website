import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import { Helmet } from 'react-helmet'

import { getLocationOrigin } from './src/helpers/url.ts'
import EnvironmentConstant from './src/constants/environment.ts'

/*
* For Less Support
* */
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'

/*
* For TypeScript Support
* */
const typescriptWebpackPaths = require('./webpack.config.js')

const path = require('path')
const fs = require('fs')

const lessToJs = require('less-vars-to-js')

const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, 'src/theme-ant-overwrite.less'), 'utf8')
)

const webpack = require('webpack')

/**
 * getBlogData
 * ------------
 * walks through ./src/blogPosts array, which contains blog posts in the form
 * of markdown files, and returns an array containing processed versions of
 * them via promise resolution.
 * ------------
 * used by getData function of /blog route
 * */
function getBlogData () {
  const matter = require('gray-matter')
  const klaw = require('klaw')

  let posts = []
  let categories = ['All']

  const getPosts = new Promise(resolve => {
    // make sure post directory exists
    if (fs.existsSync('./src/blogPosts')) {
      // walk through post directory
      klaw('./src/blogPosts')
        // process post files
        .on('data', (item) => {
          if (path.extname(item.path) === '.md') {
            const data = fs.readFileSync(item.path, 'utf8')
            const dataObj = matter(data)
            // process markdown content
            // dataObj.content = marked(data.content)

            // create slug for post's url
            dataObj.data.slug = dataObj.data.title
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '')

            // localize img src url
            if (dataObj.data.thumbnail) {
              dataObj.data.thumbnail = dataObj.data.thumbnail.replace('/public/uploads/', '')
            }
            // add to posts arr
            posts.push(dataObj)

            // add to categories arr
            if (!categories.includes(dataObj.data.category)) categories.push(dataObj.data.category)
          }
        })

        // log error
        .on('error', (e) => {
          console.log(e)
        })

        // sort posts newest to oldest
        // then resolve promise, returning posts and categories arrays
        .on('end', () => {
          posts = posts.sort(
            (p1, p2) =>
              new Date(p2.data.published_at).getTime() - new Date(p1.data.published_at).getTime()
          )

          resolve({ posts, categories })
        })
    } else {
      // resolve promise, returning posts and categories arrays
      resolve({ posts, categories })
    }
  })

  return getPosts
}

export default {
  getSiteData: () => ({
    title: 'MARKET Protocol',
  }),
  getRoutes: async () => {
    const blogData = await getBlogData()

    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/team',
        component: 'src/containers/Team',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/press',
        component: 'src/containers/Press',
      },
      {
        path: '/partners',
        component: 'src/containers/Partners',
      },
      {
        path: '/whitepaper',
        component: 'src/containers/WhitePaper',
      },
      {
        path: '/jobs',
        component: 'src/containers/Jobs'
      },
      {
        path: '/presale',
        component: 'src/containers/Presale'
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => blogData,
        children: blogData.posts.map((post) => ({
          path: `/post/${post.data.slug}`,
          component: 'src/containers/BlogPost',
          getData: () => ({ post, blogData })
        }))
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    const helmet = Helmet.renderStatic()
    meta.helmet = helmet
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const { Body, children, Html, Head, renderMeta } = this.props

      return (
        <Html itemScope itemType="http://schema.org/Article">
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="shortcut icon" href="/favicon.png" />
            <link
              href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700"
              rel="stylesheet"
            />

            {renderMeta.styleTags}
            {renderMeta.helmet && renderMeta.helmet.title.toComponent()}
            {renderMeta.helmet && renderMeta.helmet.meta.toComponent()}

            <meta httpEquiv="content-language" content="en" />
            <meta itemProp="name" content="MARKET Protocol" />
            <meta
              itemProp="description"
              content="Powering safe, solvent and trustless trading of any asset."
            />
            <meta itemProp="image" content="https://marketprotocol.io/social.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@MarketProtocol" />
            <meta name="twitter:creator" content="@MarketProtocol" />
            <meta name="twitter:image:src" content="https://marketprotocol.io/social.jpg" />
            <meta property="og:locale" content="en_US" />
            <meta name="language" content="English" />
            <meta property="og:url" content="https://marketprotocol.io/" />
            <meta property="og:title" content="MARKET Protocol" />
            <meta
              property="og:description"
              content="Powering safe, solvent and trustless trading of any asset."
            />
            <meta property="og:image" content="https://marketprotocol.io/social.jpg" />
            <meta name="robots" content="index,follow" />
          </Head>
          <Body>
            {children}
          </Body>
        </Html>
      )
    }
  },
  webpack: (config, { stage, defaultLoaders }) => {
    /*
    * TypeScript Support
    * */

    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx')

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = typescriptWebpackPaths.resolve.alias

    // Needed for momoent js resolution in React 16
    // See: https://github.com/moment/moment/issues/2979#issuecomment-332217206
    config.resolve.alias.moment$ = 'moment/moment.js'

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    const jsTsLoader = {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    }

    /*
    * Less Support
    * */

    // Add .less & .css to resolver
    config.resolve.extensions.push('.less')
    config.resolve.extensions.push('.css')

    // Loader depending on stage. Same format as the default cssLoader.
    let lessLoader = {}

    if (stage === 'dev') {
      // Enable Hot Module Replacement
      config.plugins.push(new webpack.HotModuleReplacementPlugin())

      // In-Line with style-loader
      lessLoader = {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: false,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              sourceMap: true,
              ident: 'postcss',
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modifyVars: themeVariables,
              javascriptEnabled: true,
            },
          },
        ],
      }
    } else {
      // Extract to style.css
      lessLoader = {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              hmr: false,
              sourceMap: false,
            },
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  postcssFlexbugsFixes,
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: false,
                modifyVars: themeVariables,
                javascriptEnabled: true,
              },
            },
          ],
        }),
      }
    }

    /*
    * Add new Loaders to default Loaders
    * */
    config.module.rules = [
      {
        oneOf: [jsTsLoader, lessLoader, defaultLoaders.cssLoader, defaultLoaders.fileLoader],
      },
    ]

    // Update ExtractTextPlugin with current instance
    config.plugins[2] = new ExtractTextPlugin({
      filename: getPath => {
        process.env.extractedCSSpath = 'styles.css'
        return getPath('styles.css')
      },
      allChunks: true,
    })

    return config
  },
}
