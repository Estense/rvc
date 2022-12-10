const express = require("express");
const path = require('path')

const app = express();

const port = process.env.PORT || "8000";

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.use('/', express.static(path.join(__dirname, 'static')));

app.get('/ini', (req, res) => {
  res.send('this is ini file')
});

app.get('/file', (req, res) => {
  let name = req.query.name;
  res.send(`${name}`)
});

app.get('/files', (req, res) => {
  let files = ['123', '321', '232'];
  res.send(files)
})


