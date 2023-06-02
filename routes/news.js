var express = require('express');
var router = express.Router();

var database = require('../database');

router.get('/', function (request, response, next) {
    query = `
        SELECT * FROM news
        `;

    database.query(query, function (error, data) {

        if (data.length > 0) {
            response.render('news', { title: 'News', articles: data });
        }
        else {
            response.send('No news found');
        }
        response.end();
    });
});

router.get('/:id', function (request, response, next) {
    query = `
        SELECT * FROM news
        WHERE id = "${request.params.id}"
        `;

    database.query(query, function (error, data) {

        if (data.length > 0) {
            response.render('newsSingle', { title: 'News', article: data[0] });
        }
        else {
            response.send('No news found');
        }
        response.end();
    });
})


router.post('/', async (requset, response) => {
    let search = requset.body.search
    query = `
        SELECT * FROM news
        WHERE title LIKE "%${search}%"
        `;

    database.query(query, function (error, data) {

        if (data.length > 0) {
            response.render('newsSearch', { title: 'News', articles: data });
        }
        else {
            response.send('No news found');
        }
        response.end();
    });
})

module.exports = router 
