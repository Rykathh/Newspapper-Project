var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', function (request, response, next) {
    response.render('create', { title: 'Create', session: request.session });
});

router.post('/signup', function (request, response, next) {

    var user_email_address = request.body.user_email_address;
    var username = request.body.username;
    var user_password = request.body.user_password;
    var user_confirm_password = request.body.user_confirm_password;

    if (user_email_address && username && user_password && user_confirm_password) {
        if (user_password == user_confirm_password) {
            query = `
            INSERT INTO user_login (user_email, user_password, username)
            VALUES ("${user_email_address}", "${user_password}", "${username}");
            `;

            database.query(query, function (error, data) {
                if (error) throw error;
                console.log("1 record inserted");
                response.redirect("/");
            });
        } else {
            response.send('Password Confirm do not match');
            response.end();
        }
    }
    else {
        response.send('Please Enter All Details');
        response.end();
    }

});

module.exports = router;
