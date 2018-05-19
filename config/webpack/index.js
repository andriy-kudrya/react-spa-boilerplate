// glorify node with es modules
require('babel-register')({
    plugins: ['transform-es2015-modules-commonjs']
})

module.exports = function (env) {
    require('./params').initParams(env)
    
    return require('./config.js')
}