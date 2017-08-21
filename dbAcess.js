/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b2831f68136dcd",
  password: "9654212e",
  database: "heroku_b7f13a831b669f3"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM clientes", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

