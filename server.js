/* jshint esversion: 6 */

const http = require('http');
const fs = require('fs');

//let htmlPages = ['index.html', 'helium.html'];

function parseWrite(body){
  var elName = body.split('&')[0].split('=')[1];
  var elSymb = body.split('&')[1].split('=')[1];
  var elAtom = body.split('&')[2].split('=')[1];
  var elDesc = body.split('&')[3].split('=')[1];

  var page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${elName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${elName}</h1>
  <h2>${elSymb}</h2>
  <h3>Atomic number ${elAtom}</h3>
  <p>${elDesc}</p>
  <p><a href="/">back</a></p>
  </body>
  </html>`;

  fs.writeFile(`./public/${elName}.html`, page, (err) =>{
    if (err) throw err;
    console.log("file saved");
  });
}




const server = http.createServer(function(req, res) {
  console.log("client connected");
  const { method, url } = req;
  console.log(url);
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body=Buffer.concat(body).toString();
    console.log("body is:", body);

    if (req.url === "/element" && method === "POST") {
      console.log("POST to /element");
      parseWrite(body);
    }

  });

  //console.log(req);

  res.end();
});

server.listen(8080, function(){
  console.log("server bound port 8080");
});