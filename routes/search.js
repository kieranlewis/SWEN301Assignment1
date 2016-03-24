var express = require('express');
var router = express.Router();

var basex = require('basex');
var client = new basex.Session('127.0.0.1', 1984, 'admin', 'admin');

client.execute("OPEN Colenso");

/* GET search listing. */
router.get('/', function(req, res) {
  	res.render('search', { title: 'Search' });
});

/*
router.get("/",function(req,res){
	client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" +
	" (//name[@type='place'])[1] ",
	function (error, result) {
		if(error){ 
			console.error(error);
		} else {
			res.render('search', { title: 'Search', result: result.result });
		}
	}
	);
});
*/

module.exports = router;

