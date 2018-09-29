const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/';
const dbName = 'magalufinder';
var mongodb = require('mongodb');

//Table Name
const tableName = 'stores';

class StoreService {


    constructor(req, res) {
        this.req = req
        this.res = res
    }

    // insert(storeItem, db, callback) {
    //     db.collection(tableName).insertOne(
    //         storeItem
    //         , function () {
    //             callback()
    //         })
    // }

    addStore(){
        let self = this;
        let storeItem = this.req.body.storeItem;
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var myobj = storeItem;
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

    deleteStore(){
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
   






    // addStoreOld() {
    //     let self = this;
    //     let storeItem = this.req.body.storeItem;

    //     console.log("enter add store");
    //     console.log(storeItem);


    //     MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    //         assert.equal(null, err);
    //         console.log("Connected successfully to server");

    //         const db = client.db(dbName);

    //         assert.equal(null, err);
    //         self.insert(storeItem, db, function () {
    //             // db.close()
    //             return self.res.status(200).json({
    //                 status: 'success'
    //             })
    //         })


    //     });
    // }

    storeList() {
        let self = this;
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            let cursor = dbo.collection(tableName).find();
            let storeList = [];
            cursor.each(function(err, doc) {
                assert.equal(err, null);
                if (doc != null) {
                    storeList.push(doc)
                } else {
                  return self.res.status(200).json({
                      status: 'success',
                      data: storeList
                  })
                }
              });

          });
    }
}

module.exports = StoreService