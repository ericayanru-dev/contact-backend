"use strict";

const contactModles = require("../models/contact-model");

const contactController = {};

contactController.deleteContact = async function (req, res) {
  const contact_id= req.params.id;
  try {
    //validation
    if (!contact_id) {
      return res.status(400).json({
        error: "contact_id is required",
      });
    }
    const result = await contactModles.deleteContact(contact_id);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Contact not found or already deleted",
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (err) {
    res.status(500).json(data);
  }
};

contactController.putContact = async function (req, res) {
  try {
    const contact_id = req.params.id;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    //validation
    if (!contact_id) {
      return res.status(400).json({
        error: "contact_id is required",
      });
    }

    const updateData = {};

    if (firstName) updateData.firstName = firstName.trim();
    if (lastName) updateData.lastName = lastName.trim();
    if (email) updateData.email = email.toLowerCase().trim();
    if (favoriteColor) updateData.favoriteColor = favoriteColor;
    if (birthday) updateData.birthday = birthday;

    updateData.updatedAt = new Date();

    const result = await contactModles.putContact(contact_id, updateData);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update contact" });
  }
};

contactController.postContact = async function (req, res) {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    //validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        error: "firstName, lastName and email are required",
      });
    }

    const sampleData = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await contactModles.insertContact(sampleData);

    if (result) {
      return res.status(201).json({
        success: true,
        message: "Contact inserted successfully",
        data: result,
      });
    } else {
      return res.status(409).json({
        success: false,
        message: "Contact already exists",
      });
    }
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

contactController.getContacts = async function (req, res) {
  try {
    const data = await contactModles.getContacts();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

contactController.getContactById = async function (req, res) {
  const contact_id = req.params.id;
  try {
    const data = await contactModles.getContactById(contact_id);
    if (!data) {
      return res.status(404).json({ error: "Contact not found" });
    }
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact" });
  }
};

module.exports = contactController;
