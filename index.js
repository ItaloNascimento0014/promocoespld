const express = require('express')
const path = require('path')
const cheerio = require('cheerio')
const reques = require('request')
var Crawler = require('crawler')
var reactPage = require('./reactpage')

var React = require('react');
var ReactDOMServer = require('react-dom/server');

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

class MyComponent extends React.Component {
    render() {
        return <div>Hello World</div>;
    }
}

var el = ReactDOMServer.renderToString(<MyComponent />);

 
// Queue just one URL, with default callback
c.queue("https://www.pelando.com.br/quente");

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use('/reactpage', reactPage) 
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.send(el))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
