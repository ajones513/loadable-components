export const clearModuleCache = key => {
  const module = require.cache[key]
  module.parent.children = module.parent.children.filter(item => item === module)
  delete require.cache[key]
}

export const smartRequire = modulePath => {
  if (process.env.NODE_ENV !== 'production') {
    clearModuleCache(modulePath)
  }

  // Use __non_webpack_require__ to prevent Webpack from compiling it
  // when the server-side code is compiled with Webpack
  // eslint-disable-next-line camelcase
  if (typeof __non_webpack_require__ !== 'undefined') {
    // eslint-disable-next-line no-undef
    return __non_webpack_require__(modulePath)
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require, no-eval
  return eval('require')(modulePath)
}

export const joinURLPath = (publicPath, filename) => {
  if (publicPath.substr(-1) === '/') {
    return `${publicPath}${filename}`
  }

  return `${publicPath}/${filename}`
}
