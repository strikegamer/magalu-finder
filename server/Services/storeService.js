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

    addStore() {
        let self = this;
        let storeItem = this.req.body.storeItem;
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var myobj = storeItem;
            console.log(myobj);
            console.log(dbo.collection(tableName));
            dbo.collection(tableName).insertOne(myobj, function (err) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                return self.res.status(200).json({
                    status: 'success'
                })
            });
        });
    }

    deleteStore() {
        let self = this;
        let idToDelete = this.req.body._id;
        console.log("id to delete: " + idToDelete);
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            dbo.collection(tableName).deleteOne({ _id: new mongodb.ObjectID(idToDelete) }, function (err, obj) {
                if (err) throw err;
                console.log(obj.deletedCount + " document deleted");
                db.close();
                return self.res.status(200).json({
                    status: 'success'
                })
            });
        });
    }

    storeList() {
        let self = this;
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            let cursor = dbo.collection(tableName).find();
            let storeList = [];
            cursor.each(function (err, doc) {
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

    storeName(storeId) {
        console.log("in store name! StoreId: " + storeId);
        let self = this;
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);

            dbo.collection(tableName).findOne({ _id: new mongodb.ObjectID(storeId) }, function (err, obj) {
                if (err) throw err;
                db.close();
                console.log(obj);
                return self.res.status(200).json({
                    status: 'success',
                    data: obj.Name
                })
            });


            // var ObjectId = require('mongodb').ObjectId;           
            // var o_id = new ObjectId(storeId);            
            // let store = dbo.collection(tableName).find({_id:o_id});

            // if (store) {
            //     console.log("found store");
            //     console.log(store);
            //     return self.res.status(200).json({
            //         status: 'success',
            //         data: store.Name
            //     })
            // } else {
            //     return self.res.status(200).json({
            //         status: 'error',
            //         data: "Nao encontrado"
            //     })
            // }

        });
    }
}

module.exports = StoreService