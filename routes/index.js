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

/* Search for XQUERY results */
router.get('/search', function(req, res) {
	client.execute(namespace + "for $n in (" + req.query.searchString + ")\n " + "return db:path($n)",
	function(error, result) {
		if(error) {
			res.render('search', { title: 'Search', files: [""] });
		} else {
			var list = result.result.split('\n');
			res.render('search', { title: 'Search', files: list });
		}
	}); 
});

/* Search for logical operation result */
router.get('/logicalsearch', function(req, res) {
  	client.execute(namespace + "for $n in //p[. contains text " + req.query.searchString + "] return db:path($n)",
	function(error, result) {
		if(error) {
			res.render('logicalsearch', { title: 'Search', files: [""] });
		} else {
			var list = result.result.split('\n');
			res.render('logicalsearch', { title: 'Search', files: list });
		}
	}); 
});

/* View the file in a readable manner */
router.get('/viewfile', function(req, res) {
	client.execute("XQUERY doc('Colenso" + req.query.file + "')",
	function(error, result) {
		if(!error) {
			res.render('viewfile', { title: 'View File', file: req.query.file, content: result.result });
		} 
	});
});

/* Download raw TEI */
router.get('/download', function(req,res) {
	client.execute(namespace + "for $n in (doc('Colenso/" + req.query.file + "'))\n" + "return db:path($n)",
	function(error, result) {
		if(!error) {
			res.download('../Colenso/' + result.result);
		}
	});	
});

/* Browse basex files . */
router.get('/browse', function(req, res) {
	client.execute("List Colenso",
	function(error, result) {
		if(error) {
			res.render('browse', { title: 'Browse Files' });
		} else {
			var list = result.result.split('\n');
			//formatting the data
			var line = [];
			var xmlfiles = []
			list.splice(0, 2);

			for(var i = 0; i < list.length; i++) {
				line = list[i].split(' ');
				console.log(line[0]);
				xmlfiles.push(line[0]);
			}

			res.render('browse', { title: 'Browse Files', files: xmlfiles });
		}
	}); 
});

module.exports = router;
