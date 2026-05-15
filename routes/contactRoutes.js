"use strict"

const express = require("express")
const contactController = require("../controller/contact-controller");


const router = express.Router()

// GET single contact
router.get("/contact/:id", contactController.getContactById)

// GET all contacts
router.get("/contacts", contactController.getContacts);

// Post single contact
router.post("/contact", contactController.postContact)

router.put("/contact/:id", contactController.putContact)

router.delete("/contact/:id", contactController.deleteContact)
module.exports= router