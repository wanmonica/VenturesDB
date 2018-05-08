const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8081;

const server = http.createServer(app);

server.listen(port, function () {

  var host = server.address().address

  console.log("hosting:  http://%s:%s", host, port)

})