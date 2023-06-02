var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', function (requset, response, next) {
    response.render('writing', { title: 'Post a news', session: requset.session });
});

router.post('/', function (request, response, next) {
    var title = request.body.title;
    var thumbnail = request.body.thumbnail;
    var category = request.body.category;
    var content = request.body.content;
    var summary = request.body.content;

    if (title && thumbnail && content && category) {
        query = `
            INSERT INTO news (title, thumbnail, content, summary)
            VALUES ("${title}", "${thumbnail}", "${content}", "${summary}");
            `;

        database.query(query, function (error, data) {
            if (error) throw error;
            console.log("1 record inserted");
            response.redirect("/article");
        });
    }
    else {
        response.send('Please Enter All Details');
        response.end();
    }
});

module.exports = router;
