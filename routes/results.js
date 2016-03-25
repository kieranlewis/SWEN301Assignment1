var express = require('express');
var router = express.Router();

var basex = require('basex');
var client = new basex.Session('127.0.0.1', 1984, 'admin', 'admin');

client.execute("OPEN Colenso");

var namespace = "XQUERY declare namespace tei='http://www.tei-c.org/ns/1.0'; "

/* GET results page.  
router.get('/', function(req, res) {
	res.render('results', { title: 'Results', result: req.query.searchString });
});*/

router.get('/', function(req, res) {
	client.execute(namespace + req.query.searchString, 
	function (error, result) {
		if(error) {
			console.error(error);
		} else {
			res.render('results', { title: 'Results', result: result.result });
		}
	}
	);
});

module.exports = router;