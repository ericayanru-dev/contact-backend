"use strict"

const express = require("express")
const contactController = require("../controller/contact-controller");


const router = express.Router()

// GET single contact
router.get("/contact/:contact_id", contactController.getContactById)

// GET all contacts
router.get("/contacts", contactController.getContacts);

module.exports= router