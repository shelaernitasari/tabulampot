var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.sendFile(__dirname + '/../shela.html');
});

module.exports = router;
