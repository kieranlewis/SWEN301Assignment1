var express = require('express');
var router = express.Router();

var basex = require('basex');
var client = new basex.Session('127.0.0.1', 1984, 'admin', 'admin');

client.execute("OPEN Colenso");

var namespace = "XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0'; "

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Colenso' });
});

/* GET search page. */
router.get('/search', function(req, res) {
	client.execute(namespace + 'for $n in (' + req.query.searchString + ')\n ' + 'return db:path($n)',
	function(error, result) {
		if(!error) {
			var list = result.result.split('\n');
			res.render('search', { title: 'Search', files: list });
		} else {
			res.render('search', { title: 'Search' });
		}
	}); 
});

module.exports = router;
