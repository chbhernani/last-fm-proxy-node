const url = require('url');

module.exports = {
  parseContext: (res) => {
    const rez = res;
    const mock = {
      done(error, response) {
        rez.setHeader('Content-Type', 'application/json');
        rez.writeHead(response.status);
        rez.write(JSON.stringify(response.body));
        rez.end();
      },
      log(text) {
        console.log(text);
      },
    };

    return mock;
  },
  parseRequest: (req) => {
    const rek = req;
    const mockReq = {};

    mockReq.params = url.parse(rek.url, true).query || {};
    mockReq.query = rek.query || {};
    mockReq.headers = rek.headers || {};

    // headers keys to lowercase
    if (mockReq.headers) {
      const newHeaders = {};
      Object.keys(rek.headers).forEach((key) => {
        newHeaders[key.toLowerCase()] = rek.headers[key];
      });
      mockReq.headers = newHeaders;
    }

    return mockReq;
  },
};
