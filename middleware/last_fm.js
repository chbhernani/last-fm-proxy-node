const axios = require('axios');

module.exports = (context, req) => {
  const key = req.params.key;
  const artist = req.params.artist;

  const basePath = 'http://ws.audioscrobbler.com/2.0/';
  const url = `${basePath}?method=artist.getinfo&artist=${artist}&api_key=${key}&format=json`;

  function errorHandler(error) {
    context.log(error);
    context.done(null, {
      status: error.response.status || 502,
      body: {
        message: 'Some error happen',
        result: {
          status: error.response.status,
          data: error.response.data,
        },
      },
    });
  }

  function responseHandler(response) {
    context.done(null, {
      status: 200,
      body: response.data,
    });
  }

  axios.get(url)
    .then(response => responseHandler(response))
    .catch(error => errorHandler(error));
};
