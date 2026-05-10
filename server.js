"use strict"

const express = require('express');
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config()


const contactRoutes = require("./routes/contactRoutes")
const connectMongodb = require("./db-connection/mongodb-connection")
const { insertSampleContacts } = require("./models/contact-model");

// middleware
app.use(bodyParser.json())
app.use(express.json())

// routes
app.use("/", contactRoutes)

// 404 handler
app.use((req, res) => {
    res.status(404).json({error: "Route not found"})
})

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8080;

async function startServer() {
    try {
        const db = await connectMongodb.mongoClient()
        console.log("DB result:"); // 👈 ADD THIS

        if (!db) {
            console.error("No DB connection returned");
            return
        };
        if (db) {
            app.listen(PORT, () => {
                console.log(` App listening at ${HOST}:${PORT}`);
                insertSampleContacts()
            });
        }
    }
    catch (err) {
        console.error("Failed to start server:", err)
    }
}

startServer()