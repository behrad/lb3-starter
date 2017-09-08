const loopback = require('loopback')
const boot = require('loopback-boot')
const LoopbackConsole = require('loopback-console')
const appInfo = require('../package.json')

const app = module.exports = loopback()

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started')
    let baseUrl = app.get('url').replace(/\/$/, '')
    console.log('Web server listening at: %s', baseUrl)
    if (app.get('loopback-component-explorer')) {
      let explorerPath = app.get('loopback-component-explorer').mountPath
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
    }
  })
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err

  // activate by --console OR LOOPBACK_CONSOLE=1
  if (LoopbackConsole.activated()) {
    LoopbackConsole.start(app, {
      prompt: `${appInfo.name}[${appInfo.version}] # `,
      handles: {
        behrad: {
          test: 1,
        },
      },
    })
  } else if (require.main === module) {
    app.start()
  }
})
