const mysql = require('mysql');

const connection = mysql.createConnection({
	host : 'localhost',
	database : 'login',
	user : 'root',
	password : 'Kho^i8920'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;