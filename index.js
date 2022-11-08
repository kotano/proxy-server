require('dotenv').config()
var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var fs = require('node:fs');

http.createServer(function (req, res) {
  proxy.web(req, res, {
    target: process.env.PROXY_URL,
    secure: false,
    ssl: {
      key: fs.readFileSync(process.env.SSL_KEY, 'utf8'),
      cert: fs.readFileSync(process.env.SSL_CERT, 'utf8')
    }
  })
}).listen(process.env.PROXY_PORT || 3008);
