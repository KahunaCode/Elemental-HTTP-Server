/* jshint esversion: 6 */

const http = require('http');
const fs = require('fs');
const qs = require('querystring');

//let htmlPages = ['index.html', 'helium.html'];

function parseWrite({elementName, elementSymbol, elementAtomicNumber, elementDescription}){

  var page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${elementName}</h1>
  <h2>${elementSymbol}</h2>
  <h3>Atomic number ${elementAtomicNumber}</h3>
  <p>${elementDescription}</p>
  <p><a href="/">back</a></p>
  </body>
  </html>`;

  fs.writeFile(`./public/${elementName}.html`, page, (err) =>{
    if (err) throw err;
    console.log("file saved");
  });
}


const server = http.createServer(function(req, res) {
  console.log("client connected");
  const { method, url } = req;
  console.log(url);
  let body = "";
  req.on('data', (chunk) => {
    //body.push(chunk);
    body+=chunk;
  }).on('end', () => {
    //body=Buffer.concat(body).toString();
    body = qs.parse(body);
    console.log("body is:", body);

    if (req.url === "/element" && method === "POST") {
      console.log("POST to /element");
      parseWrite(body);
    }


  });


  res.end();
});

server.listen(8080, function(){
  console.log("server bound port 8080");
});