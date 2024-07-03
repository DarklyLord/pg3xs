var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

let resulter="";

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM pg3xs.accesslevel", function (err, result, fields) {
    if (err) throw err;
    resulter=result;
    console.log(JSON.stringify(result))
  });
});
