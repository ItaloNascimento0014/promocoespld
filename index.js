const express = require('express')
const path = require('path')
const cheerio = require('cheerio')
const reques = require('request')
const PORT = process.env.PORT || 5000
var a = "hell";
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.send(a))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
