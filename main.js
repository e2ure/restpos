/**
 * dependencias
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var clientes = require('./routes/clientes'); 
var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}


app.use(
    
    connection(mysql,{
        
        host: 'us-cdbr-iron-east-05.cleardb.net',
        user: "b2831f68136dcd",
        password: "9654212e",
        database: "heroku_b7f13a831b669f3"
    },'request')
);//route index, hello world
//app.get('/', routes.index);//route customer listv
app.get('/clientes', clientes.list);//route add customer, get n post
app.get('/clientes/add', clientes.add);
app.post('/clientes/add', clientes.save);//route delete customer
//app.get('/clientes/delete/:id', clientes.delete_customer);//edit customer route , get n post
app.get('/clientes/edit/:id', clientes.edit); 
app.post('/clientes/edit/:id',clientes.save_edit);
//app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});