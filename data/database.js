const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
dotenv.config();

const Mongo = require('mongodb').MongoClient;

let database;

const initdb = (callback) => {
    if (database) {
        console.log('Database is already initialized');
        return callback(null, database);
    }  
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            callback(null, database);
        }) 
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database is not initialized');
    }
    return database;
};

module.exports = {
    initdb,
    getDatabase,
};