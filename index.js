const express = require('express')
const path = require('path')
const cheerio = require('cheerio')
const reques = require('request')
var Crawler = require('crawler')

const PORT = process.env.PORT || 5000
var title = "";

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
          title =  $("h1").text();
        }
        done();
    }
});
 
// Queue just one URL, with default callback
c.queue("https://morioh.com/p/b260ff42c61f/how-to-web-scraping-with-node-js-cheerio");

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.send(title))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
