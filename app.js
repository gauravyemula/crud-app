var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crud');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open',function(callback){
	console.log("connection succeeded");
})

var app=express()

app.use(bodyParser.json());
app.use(express.static(__dirname + "crud"));
app.use(bodyParser.urlencoded({
	extended:true
}));

app.post('/crud', function(req,res){
	var firstname=req.body.firstname;
	var lastname=req.body.lastname;
	var id=req.body.id;
	var email=req.body.emailid;
	var phone=req.body.phno;
	var designation=req.body.design;

	var data= {
		"firstname":firstname,
		"lastname":lastname,
		"id":id,
		"email":email,
		"phone":phone,
		"designation":designation
	}

db.collection('crud_details').insertOne(data, function(err, collection){
	if(err) throw err;
	console.log("Record inserted succesfully");
	});

	return res.redirect('index.html');
});

app.get('/index',function(req,res){

 return res.redirect('index.html');
}).listen(3500);
console.log("server listening to 3000");
