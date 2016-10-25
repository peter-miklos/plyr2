var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {

  res.render(path.join(__dirname, '../views', 'users/logIn.ejs'));

});

module.exports = router;
