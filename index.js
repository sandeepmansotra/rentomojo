var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
var port= process.env.Port || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/form.html'));
});
app.post('/submit',function(req,res){

  var message=req.body.message;

  res.write('Your comments submitted "' + req.body.message+'".\n');

  con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO comments (message) VALUES ('"+message+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
     res.end();
  });
  });
})
app.listen(port);
console.log("Running at Port 3000");
