const express = require("express");
const path = require('path');
const open = require('open');
const Client = require('ftp');
const fs = require('fs');
const ini = require('ini');
var cors = require('cors')
const basicAuth = require('express-basic-auth')





const app = express();
app.use(cors());
app.use(basicAuth({
  users: { 'admin': '1234' },
  challenge: true
}));
const port = process.env.PORT || "8000";

var ftphost = {
  //'host': "192.168.0.222",
  'host': "127.0.0.1",
  'port': '21',
  'user': 'root',
  'password': '1234'
}


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.use('/', express.static(path.join(__dirname, 'static')));

app.get('/ini', (req, res) => {
  res.send('this is ini file')
});

app.get('/file', (req, res) => {
  let name = req.query.name;
  let fileExtension = name.split('.');
  console.log(fileExtension);
  let c = new Client();
  c.connect(ftphost);
  c.on('ready',   function() {
    c.get(name, function(err, stream) {
      if (err) throw err;
      stream.once('close', function() { c.end(); });
      stream.pipe(fs.createWriteStream(`./static/${name}`));
      if (fileExtension[fileExtension.length - 1] === 'ini') {
        console.log(fileExtension);
        stream.pipe(res.send(ini.parse(fs.readFileSync(`./${name}`, 'utf-8'))))
      } 
    });
  });
});

app.get('/list', (req, res) => {
  var c = new Client();
  c.connect(ftphost);
  c.on('ready', function () {
    c.list(function (err, list) {
      if (err) throw err;
      res.send(list)
      c.end();
    });
  });
});

app.get('/connect', (req, res) => {
  c.connect(ftphost);
}) 

app.get('/logout', (req, res) => {
  res.status(401).send('Logged out')

})

//open(`http://localhost:${port}`);


