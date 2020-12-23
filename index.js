const express = require('express')
const path = require('path')
const cheerio = require('cheerio')
const reques = require('request')
var Crawler = require('crawler')
const React = require('react')
const ReactDOM = require('react-dom')

const PORT = process.env.PORT || 5000
var title = "";
var conc = "[";

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

$("article").each((ind,it)=>{
    var obj = new Object();
    var descricaoProduto = $(it).find(".cept-tt.thread-link").text().replace(/(-|\||\,|\;|\[|\]|\{|\}|\(|\)|\"|\')/g, "").trim();
    var precoProduto = $(it).find(".thread-price").text().trim();
    if (descricaoProduto != "") {
        obj.descricaoProduto = descricaoProduto + "##";
        obj.precoProduto = precoProduto;
        var jsonString = JSON.stringify(obj);
        conc += jsonString + ",";
    }
  }
)

var re = /\}\,\]/g;
var reMoney = /R\$(\d{1,10}|\d{1,3}\.\d{1,3})##/g;
var reHashtag = /##/g;            
conc += "]";
var result = re.exec(conc);
var resultMon = reMoney.exec(conc);
conc = conc.replace(re, "}]").replace(reMoney,"").replace(reHashtag,"");    
        }
        done();
    }
});

const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementsByTagName('body'));
 
// Queue just one URL, with default callback
c.queue("https://www.pelando.com.br/quente");

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.send(conc))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
