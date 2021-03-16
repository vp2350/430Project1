const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const savedPage = fs.readFileSync(`${__dirname}/../client/client2.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getSavedPages = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(savedPage);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getCSS = getCSS;
module.exports.getSavedPages = getSavedPages;
