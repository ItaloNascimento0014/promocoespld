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
            var arrProdutos = new Array();
            
            $(".cept-tt.thread-link.linkPlain.thread-title--card").each((index,item)=>{
            	 var txt = $(item).text().replace(/(-|\||\,|\;|\[|\]|\{|\}|\(|\)|\"|\')/g,"").trim();
             	arrProdutos.push(txt);
            })
  		 title = JSON.stringify(arrProdutos);
         download-m3u8 https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
     
        }
        done();
    }
});
 
// Queue just one URL, with default callback
c.queue("https://www.pelando.com.br/quente");

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.send(title))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
