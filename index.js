
var fs = require('fs');
var nib = require('nib');
var path = require('path');
var stylus = require('stylus');
var express = require('express');

var app = express();

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'jade');

app.use('/img', express.static(path.join(__dirname, 'assets')));

app.get('/', function (req, res) {
  res.render('landing');
});

app.get('/style', function (req, res, next) {
  var mainPath = path.join(__dirname, 'assets', 'main.styl');
  fs.readFile(mainPath, function (err, buf) {
    if (err) {
      next(err);
    } else {
      stylus(buf.toString())
        .set('filename', mainPath)
        .set('compress', true)
        .use(nib())
        .render(function (err, css) {
          if (err) {
            next(err);
          } else {
            res.set('Content-Type', 'text/css');
            res.send(css);
          }
        });
    }
  });
});

app.listen(3160);
console.log('http://localhost:3160/');
