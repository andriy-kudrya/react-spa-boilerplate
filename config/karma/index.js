// glorify node with es modules
require('babel-register')({
    plugins: ['transform-es2015-modules-commonjs']
})

require('../webpack/params').initParams({
    debug: true,
})
// require('../webpack/config.js')

const paths = require('../webpack/paths').default
    , webpack = require('../webpack/config').default

    // doesn't work with chunks, see:
    // https://github.com/webpack-contrib/karma-webpack/pull/325
    delete webpack.optimization

module.exports = (config) => {
    config.set({
        mime: {
            'text/x-typescript':  ['ts']
        },

        files: [
            // all files ending in "_test"
            // { pattern: '*.test.ts', watched: false },
            { pattern: '**/*.test.ts', watched: false }
            // each file acts as entry point for the webpack configuration
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // add webpack as preprocessor
            // '*.test.ts': ['webpack'],
            '**/*.test.ts': ['webpack'],
        },

        webpack: require('../webpack/config').default,

        webpackServer: {
            noInfo: true
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: paths.app,


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],


        // list of files / patterns to exclude
        exclude: [
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_ERROR,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
    })
}
