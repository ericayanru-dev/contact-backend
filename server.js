"use strict"

const express = require('express');
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config()
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');

app.use(cors());
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const contactRoutes = require("./routes/contactRoutes")
const connectMongodb = require("./db-connection/mongodb-connection")


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
        console.log("DB result:");

        if (!db) {
            console.error("No DB connection returned");
            return
        };
        if (db) {
            app.listen(PORT, () => {
                console.log(` App listening at ${HOST}:${PORT}`);
            });
        }
    }
    catch (err) {
        console.error("Failed to start server:", err)
    }
}

startServer()