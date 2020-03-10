const express = require('express');
const request = require('request');
const cheerio	= require('cheerio');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){

	let url = req.query.url ? req.query.url : null;
	if(url) {
		console.log("jakobs pirating the nyt at: "+url);
		request(url, function(error, response, html){
            console.log("Successfully retrieved data from "+url);
            let serving;
            let title;
            let intro;
            if(!error){
              const $ = cheerio.load(html);
              title = $('h1');
              serving = $("[class=recipe-time-yield]").html();
              intro = $("[class=topnote]").html();
              instructions = $("[class=recipe-instructions]").html();
            }
            console.log("Outputting Scrape Data for "+url);
            res.render('article', {serving, title, intro});
		});
	} else {
		res.json({"error": "URL Param not defined."});
	}

});

/* LISTEN ON PORT */
app.listen('8081')
console.log('NYT Started on Port 8081');
exports = module.exports = app;
