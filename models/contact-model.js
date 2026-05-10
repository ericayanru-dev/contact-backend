'use strict'

const connectMongodb = require("../db-connection/mongodb-connection")
 const { ObjectId } = require("mongodb");

const contactModles = {}
    
const sampleContacts = [
    {
        firstName: "Rick",
        lastName: "Ayanru",
        email: "rick@example.com",
        favoriteColor: "Blue",
        birthday: "1995-05-15"
    },
    {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@example.com",
        favoriteColor: "Green",
        birthday: "1998-08-22"
    },
    {
        firstName: "Michael",
        lastName: "Chen",
        email: "michael@example.com",
        favoriteColor: "Red",
        birthday: "1993-11-03"
    }
]

contactModles.insertContact = async function (sampleData) {
    try {
        const db = await connectMongodb.connectMongodb()
        const data = db.collection("contacts")

        // Check if exact data already exists
        const existingData = data.find({
        firstName: sampleData.firstName,
        email: sampleData.email,
        })
        if (existingData) {
            console.log("Professional data already exists. Skipping seed.");
            return;
        }
        const result = await collection.insertOne(sampleData);
        console.log("Sample data inserted successfully");
    return result
    } catch (err) {
        console.log("error inserting data")
    }
}

contactModles.getContacts = async function () {
    try {
        const contacts = await connectMongodb.mongoClient()
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

contactModles.insertSampleContacts = async function () {
    try {
        const db = await connectMongodb.mongoClient()
        const collection = db.collection("contacts")

        // Check if data already exists
        const existingCount = await collection.countDocuments()

        if (existingCount > 0) {
            console.log(`✅ Database already has ${existingCount} contacts. Skipping insert.`)
            return
        }

        // Insert sample data
        const result = await collection.insertMany(sampleContacts)
        
        console.log(`Successfully inserted ${result.insertedCount} sample contacts!`)        
    } catch (err) {
        console.error(" Error inserting sample data:", err)
    }
}


module.exports = contactModles