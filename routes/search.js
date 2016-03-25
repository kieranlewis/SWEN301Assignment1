var express = require('express');
var router = express.Router();

var basex = require('basex');
var client = new basex.Session('127.0.0.1', 1984, 'admin', 'admin');

client.execute("OPEN Colenso");

/* GET search page. */
router.get('/', function(req, res) {
  	res.render('search', { title: 'Search' });
});


router.get('/results', function(req, res) {
	res.render('results', { title: 'Results', result: req.query.searchString })
});

module.exports = router;

