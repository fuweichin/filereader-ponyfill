const http = require('http');
const express = require('express');

let app = express();
app.use('/', express.static('.'));

let server = http.createServer(app);
server.listen(8080, ()=> {
  console.log('server listening on http://localhost:8080/');
});
