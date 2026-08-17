function versionPlugin() {
  const version = `${Date.now()}`
  const payload = JSON.stringify({ version })

  return {
    name: 'hrc-app-version',
    config() {
      return {
        define: {
          __APP_VERSION__: JSON.stringify(version),
        },
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url !== '/version.json') {
          next()
          return
        }
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store')
        res.end(payload)
      })
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: payload,
      })
    },
  }
}

export default versionPlugin
