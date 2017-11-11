var http = require('http');

//create a server object:
http.createServer(onRequest).listen(8888); //the server object listens on port 8888

function onRequest(req, res) {

  if (req.url == '/home') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<h1>Welcome to the HomePage</h1>")
  }
  else if (req.url == "/getData") {
    res.writeHead(200, {'Content-Type': 'application/json'})
    var json = {
      name:'Andrew Martherus',
      class:'cs313'
    }
    var jsonstr = JSON.stringify(json);
    res.write(jsonstr);
  }
  else {
    res.writeHead(404, 'Page Not Found');
  }
  res.end();
}
