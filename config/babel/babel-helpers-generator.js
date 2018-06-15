const helpers = require('babel-helpers')
    , generator = require('babel-generator').default
    , t = require('babel-types')
    , fs = require('fs')
    , path = require('path')

function escapeName(name) {
    return `${name}`
}

// function helperExportExpression(helperName) {
//     const helper = helpers.get(helperName)
//         , identifier = t.identifier(escapeName(helperName))

//     const declaration = t.isFunctionExpression(helper)
//             ? t.functionDeclaration(
//                 identifier,
//                 helper.params,
//                 helper.body,
//                 helper.generator,
//                 helper.async
//             )
//             : t.variableDeclaration('const', [
//                 t.variableDeclarator(identifier, helper)
//             ])

//     const result = t.exportNamedDeclaration(declaration, [])

//     return result
// }

function helperExportExpression(helperName) {
    const helper = helpers.get(helperName)
        , safeHelper = t.isCallExpression(helper)
            ? t.parenthesizedExpression(helper)
            : helper

    return t.exportDefaultDeclaration(safeHelper)
}

function generateHelpers() {
    const helpersDirectory = path.join(__dirname, 'helpers')

    if (!fs.existsSync(helpersDirectory))
        fs.mkdirSync(helpersDirectory)

    helpers.list.forEach(name => {
        const ast = helperExportExpression(name)
            , code = generator(ast).code

        fs.writeFileSync(
            path.join(helpersDirectory, escapeName(name) + '.js'),
            code
        )
    })
}

generateHelpers()
