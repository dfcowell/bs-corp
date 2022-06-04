const path = require('path')
const express = require('express')
const app = express()
const port = 8080

const serveStatic = express.static(path.join(__dirname, 'static'))

app.use((req, res, next) => {
  const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);

  if (url.host.split('.').length <= 2) {
    return serveStatic(req, res, next);
  }

  next()
})

app.use((req, res) => {
  res.status(200).end('B-S Corporate Network Host, Authorized Corporate Assets Only')
})

const server = app.listen(port, () => {
  console.log(`BS corporate network server listening on port ${port}`)
})

server.on('connection', (socket) => socket.setTimeout(5000))

process.on('SIGTERM', () => {
  server.close()
})