
const yargs = require('yargs')
const fs = require('fs')
const foldersName = require('../foldersName')

function cp(cb) {
  const options = yargs
    .usage('Page name: -n <name>')
    .option('n', {
      alias: 'name',
      describe: 'Page name',
      type: 'string',
      demandOption: true
    }).argv

  console.log(`Creating, ${options.name} page...`)

  const name = options.name
  // @ts-ignore
  const capName = name.charAt(0).toUpperCase() + name.slice(1)

  const path = `${foldersName.sourceFolder}/templates/${name}.html`
  const path2 = `${foldersName.sourceFolder}/scss/pages/${name}.scss`
  const path3 = `${foldersName.sourceFolder}/js/core/renderers/${capName}.js`

  const scssPages = `${foldersName.sourceFolder}/scss/pages/all.scss`
  const scssContent = fs.readFileSync(scssPages, 'utf8')
  const jsPages = `${foldersName.sourceFolder}/js/core/renderers/index.js`
  const jsContent = fs.readFileSync(jsPages, 'utf8')

  fs.writeFile(scssPages, `${scssContent}\r\n@import '${name}';`, cb)
  fs.writeFile(
    jsPages,
    `${jsContent} export {default as ${capName}} from './${capName}'`,
    cb
  )

  const template1 = `{% set title = "${name}" %}
{% set route = "${name}" %}
{% extends "layouts/_layout.html" %}\r\n\r\n
{% block content %}\r\n
<h1>${capName}</h1>\r\n
{% endblock %}`

  const template3 = `import Highway from '@dogstudio/highway'

export default class ${capName} extends Highway.Renderer {

  onEnterCompleted() {
    console.log(Hello from ${capName})
  }
  onLeave() {
  }
}`

  fs.appendFile(path, template1, cb)
  fs.appendFile(path2, '', cb)
  fs.appendFile(path3, template3, cb)

  console.log(path, path2, path3)

  cb()
}

module.exports = cp
