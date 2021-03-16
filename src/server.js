const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//Handles post requests
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addSwatch') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      console.dir(bodyString);
      console.dir(bodyParams);
      jsonHandler.addSwatch(request, response, bodyParams);
    });
  }
};

//Handles the get responses
const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/home') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/saved.html') {
    htmlHandler.getSavedPages(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else if (parsedUrl.pathname === '/getSwatches') {
    jsonHandler.getSwatches(request, response);
  } else if (parsedUrl.pathname === '/notReal') {
    jsonHandler.notFound(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

//Handles the head responses (not used in this project)
const handleHead = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsersMeta(request, response);
  } else if (parsedUrl.pathname === '/notReal') {
    jsonHandler.notFoundMeta(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

//Handles client requests
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (request.method === 'GET') {
    handleGet(request, response, parsedUrl);
  } else {
    handleHead(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
