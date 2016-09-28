var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan')
var fs = require('fs');
var config = require('./config');
var app = express();


// 日志目录
fs.existsSync(config.logDir) || fs.mkdirSync(config.logDir);
//连接数据库
mongoose.connect('mongodb://localhost/practice');


app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));
app.use(express.static(path.join(__dirname, 'public')));
// 设置view目录为views，渲染引擎为ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(res, res, next) {
  res.setHeader('Access-Control-Allow-Origin','*');
  next();
});

app.use('/', require('./routes/user'));
app.use('/user', require('./routes/user'));

// 404 错误处理
app.use(function(req, res) {
  res.send({code:404, message: '没有这个页面'})
});

// 开发环境错误处理
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 生产环境错误处理
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


module.exports = app;
