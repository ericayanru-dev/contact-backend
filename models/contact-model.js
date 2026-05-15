'use strict'

const connectMongodb = require("../db-connection/mongodb-connection")
 const { ObjectId } = require("mongodb");

const contactModles = {}

contactModles.insertContact = async function (sampleData) {
    try {
        const db = await connectMongodb.mongoClient()
        const collection = db.collection("contacts")

        // Check if exact data already exists
        const existingData = await collection.findOne({
            firstName: sampleData.firstName,
            email: sampleData.email,
        })

        if (existingData) {
            console.log("Contact already exists. Skipping insertion.");
            return null; 
        }

        const result = await collection.insertOne(sampleData);
        console.log("Sample data inserted successfully");
        return result;

    } catch (err) {
        console.error(" Error inserting data:", err);
        throw err; 
    }
}

contactModles.getContacts = async function () {
    try {
        const db = await connectMongodb.mongoClient()
        const data = await db.collection("contacts").find().toArray();
        return data
    }
    catch (err) {
        console.log("data error")
    }
}

contactModles.getContactById = async function (contact_id) {
    try {
        const db = await connectMongodb.mongoClient()
        const data = await db.collection("contacts")
        // Correct way to find by ID
        const result = await db.collection("contacts").findOne({ 
            _id: new ObjectId(contact_id) 
        });

        return result;

    }catch (err) {
        console.error(" Error fetching contact by ID:", err);
        throw err;   // Important: re-throw so controller can catch it
    }
}

contactModles.putContact = async function (contact_id, updateData) {
  try {
    const db = await connectMongodb.mongoClient()
    const data = await db.collection("contacts")
    const result = await data.updateOne(
      { _id: new ObjectId(contact_id) },
      { $set: updateData }
    );

    return result;

  } catch (err) {
    console.error(" Error fetching contact by ID:", err);
    throw err;
  }
}

contactModles.deleteContact = async function (contact_id) {
  try {
    const db = await connectMongodb.mongoClient()
    const data = await db.collection("contacts")
    const result = await data.deleteOne(
      { _id: new ObjectId(contact_id) }
    );

    return result;

  } catch (err) {
    console.error(" Error deleting contact ID:", err);
    throw err;
  }
}

module.exports = contactModles