const express = require('express')
const cors = require('cors');
const app = express();
const StoreService  = require('./services/storeService');
const ProductService  = require('./services/productService');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.get('/', function (req, res) {
  res.send('Magalu Finder APIs.');
})

//STORES
app.get('/api/stores', function (req, res) {
  let storeServiceObj = new StoreService(req, res);
  storeServiceObj.storeList();
})

app.get('/api/storename', function(req, res){
  console.log(req.query.storeid);
  let storeId = req.query.storeid;
  let storeServiceObj = new StoreService(req, res);
  storeServiceObj.storeName(storeId);

});

// app.get('/api/storename/:storeId', function (req, res) {
//   console.log("try storename");
//   console.log(storeId);  
//   let storeServiceObj = new StoreService(req, res);
//   storeServiceObj.storeName(storeId);
// })

app.post('/api/addstore', function (req, res) {
    let storeServiceObj = new StoreService(req, res);
    storeServiceObj.addStore();
})

app.post('/api/deletestore', function (req, res) {
  let storeServiceObj = new StoreService(req, res);
  storeServiceObj.deleteStore();
})

//PRODUCTS
app.get('/api/products', function (req, res) {
  let productServiceObj = new ProductService(req, res);
  productServiceObj.productList();
})

app.post('/api/addproduct', function (req, res) {
    let productServiceObj = new ProductService(req, res);
    productServiceObj.addProduct();
})

app.post('/api/deleteproduct', function (req, res) {
  let productServiceObj = new ProductService(req, res);
  productServiceObj.deleteProduct();
})
  

app.listen(3000, function () {
  console.log('Magalu Finder Web app service listening on port 3000!')
})