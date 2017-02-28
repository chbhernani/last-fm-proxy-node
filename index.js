const http = require('http');
const mock = require('./azure_mock');
const lastFM = require('./middleware/last_fm');

const hostname = '127.0.0.1';
const port = 3000;

http.createServer((req, res) => {
  lastFM(mock.parseContext(res), mock.parseRequest(req));
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
