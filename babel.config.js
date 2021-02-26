module.exports = {
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    'babel-plugin-styled-components',
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'src'
      }
    ]
  ]
}