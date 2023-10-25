//call routers
const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactsById,
  insertContact,
  updateContact,
  deleteContact,
} = require("../controllers/contacts");
router.get("/", getContacts);
router.get("/:id", getContactsById);
router.post("/", insertContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
