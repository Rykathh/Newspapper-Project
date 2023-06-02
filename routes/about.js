var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (requset, response, next) {
    response.render('about', { title: 'About', session: requset.session });
});

module.exports = router;
