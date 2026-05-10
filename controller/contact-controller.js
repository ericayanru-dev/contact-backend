"use strict"

const contactModles = require("../models/contact-model")




const contactController = {};

contactController.getContacts = async function (req, res) {
    try {
        const data = await contactModles.getContacts()
        res.status(200).json(data);
    }catch (err) {
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
}

contactController.getContactById = async function (req, res) {
    const contact_id = req.params.contact_id;
    try {
        const data = await contactModles.getContactById(contact_id)
        if (!data) {
            return res.status(404).json({ error: "Contact not found" })
        }
        return res.status(200).json(data)
    }catch (err) {
        res.status(500).json({ error: "Failed to fetch contact" });
    }
}

module.exports = contactController