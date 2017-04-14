var express =require('express');
var path=require('path');
var static =require('serve-static');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session=require('express-session');
var mongoStore=require('connect-mongo')(session);
var logger=require('morgan');
var port = process.env.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://localhost/imooc';
mongoose.Promise = Promise;

mongoose.connect(dbUrl);


app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
	secret:'imooc',
	store:new mongoStore({
		url:dbUrl,
		collection:'sessions'
	}),
	resave:false,
	saveUninitialized:true
}))
if('development'===app.get('env')){
	app.set('showStackError',true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug',true)
}
require('./config/routes')(app);
app.use(static(path.join(__dirname,'public')));
app.locals.moment = require('moment');
app.listen(3000);

console.log('movie started on port' + port);
