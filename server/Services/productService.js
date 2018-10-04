const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/';
const dbName = 'magalufinder';
var mongodb = require('mongodb');
const StoreService  = require('./storeService');

//Table Name
const tableName = 'products';

class ProductService {


    constructor(req, res) {
        this.req = req
        this.res = res
    }

    addProduct(){
        let self = this;
        let productItem = this.req.body.productItem;
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var myobj = productItem;
            console.log(myobj);
            console.log(dbo.collection(tableName));
            dbo.collection(tableName).insertOne(myobj, function(err) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
                return self.res.status(200).json({
                    status: 'success'
                })
            });
          });
    }

    deleteProduct(){
        let self = this;
        let idToDelete = this.req.body._id;
        console.log("id to delete: " + idToDelete);
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            dbo.collection(tableName).deleteOne({_id: new mongodb.ObjectID(idToDelete)}, function(err, obj) {               
              if (err) throw err;              
              console.log(obj.deletedCount + " document deleted");
              db.close();
              return self.res.status(200).json({
                status: 'success'
            })
            });
          });
    }

    productList() {
        let storeServiceObj = new StoreService;
        let self = this;
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            let cursor = dbo.collection(tableName).find();
            let productList = [];
            cursor.each(function(err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    console.log(doc);
                    // let productItem = {};
                    // productItem._id = doc._id;
                    // productItem.Code = doc.Code;
                    // productItem.Name = doc.Name;
                    // productItem.Price = doc.Price;
                    // productItem.StoreId = doc.StoreId;
                    // productItem.StoreName = storeServiceObj.storeName(doc.StoreId);
                    // productList.push(productItem);
                    productList.push(doc);
                } else {
                  return self.res.status(200).json({
                      status: 'success',
                      data: productList
                  })
                }
              });

          });
    }
}

module.exports = ProductService