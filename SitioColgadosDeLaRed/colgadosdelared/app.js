var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var multer = require('multer');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var integrantesRouter = require('./routes/integrantes');
var historiaRouter = require('./routes/historia');
var galeriaRouter = require('./routes/galeria');
var novedadesRouter = require('./routes/novedades');
var contactoRouter = require('./routes/contacto');
var loginRouter = require('./routes/admin/login');
var adminNovedadesRouter = require('./routes/admin/novedades')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) =>{
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

app.use(multer({storage,limits:{fileSize: 5000000},
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"&& ext !== ".gif") {
      cb(new Error("El Formato no es Compatible"), false);
      return;
    }
    cb(null, true);
  }}).single('image'));

app.use(session({
  secret: 'hU3vUxIa*a!p2kq!LGNM9JpjzJ&TAE',
  resave: false,
  saveUninitialized: true
}));

secured = async(req, res, next)=>{
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next()
    }else{
      res.redirect('/admin/login');
    }
  }catch(error){
    console.log(error);
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/integrantes', integrantesRouter);
app.use('/historia', historiaRouter);
app.use('/galeria', galeriaRouter);
app.use('/novedades', novedadesRouter);
app.use('/contacto', contactoRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades',secured, adminNovedadesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
