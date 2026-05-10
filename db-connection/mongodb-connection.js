'use strict'

const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectMongodb = {}
let db;
let connection;

connectMongodb.mongoClient = async function () {
    try {
        if (db) {
            console.log('✅ Database already connected');
            return db
        }
        if (!connection) {
            connection = new MongoClient(process.env.MONGO_URI);
        }
        await connection.connect()
        db = connection.db("Contact")
        console.log("✅ MongoDB connected successfully to database: Contact");
        return db
    }
    catch(err)
    {
        console.error("was not able to connect to the database")
        throw err
    }
}

module.exports = connectMongodb