const express = require('express')
const cors = require('cors');
const app = express();
const StoreService  = require('./services/storeService')
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.get('/', function (req, res) {
  res.send('Magalu Finder APIs.')
})

app.get('/api/stores', function (req, res) {
  let storeServiceObj = new StoreService(req, res)
  storeServiceObj.storeList();
})

app.post('/api/addstore', function (req, res) {
    let storeServiceObj = new StoreService(req, res)
    storeServiceObj.addStore();
})

app.post('/api/deletestore', function (req, res) {
  let storeServiceObj = new StoreService(req, res)
  storeServiceObj.deleteStore();
})
  

app.listen(3000, function () {
  console.log('Magalu Finder Web app service listening on port 3000!')
})