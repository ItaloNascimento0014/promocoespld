const express = require('express')
const path = require('path')
const cheerio = require('cheerio')
const reques = require('request')
const PORT = process.env.PORT || 5000
var a = "hell";

var Crawler = require("crawler").Crawler;
var c = new Crawler({
 "maxConnections":10,
 
 // This will be called for each crawled page
 "callback":function(error,result,$) {
 var title = $("h1").text();
 
 }
});
// Queue just one URL, with default callback
c.queue("http://www.tudogostoso.com.br/receita/168837-bolo-de-mucilon.html");





express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.send(title))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
