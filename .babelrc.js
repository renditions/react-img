const moduleType = process.env.BABEL_MODULE_TYPE === 'esm' ? false : process.env.BABEL_MODULE_TYPE || 'commonjs'

const production = {
  presets: [
    ['@babel/env', { modules: moduleType }],
    '@babel/react'
  ]
}

module.exports = production
