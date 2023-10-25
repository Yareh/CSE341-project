const { getDb } = require("../DB/conection");
const { ObjectId } = require("mongodb");

const getContacts = (req, res) => {
  const db = getDb();
  let clients = [];
  db.collection("Contacts")
    .find()
    .forEach((client) => clients.push(client))
    .then(() => {
      res.status(200).send(clients);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not found the contact." });
    });
};

const getContactsById = (req, res) => {
  const db = getDb();
  db.collection("Contacts") 
    .findOne({ _id: ObjectId(req.params.id) })
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not retrieve the contact by id." });
    });
};

const insertContact = (req, res) => {
  const db = getDb();
  const contact = req.body;
  db.collection("Contacts")
    .insertOne(contact)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new contact." });
    });
};

const updateContact = (req, res) => {
  const db = getDb();
  const contact = req.body;
  db.collection("Contacts")
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: contact })
    .then((result) => {
      res.status(204).send(result);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not update the contact." });
    });
};

const deleteContact = (req, res) => {
  const db = getDb();
  db.collection("Contacts")
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      res.status(204).send(result);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not delete contact." });
    });
};

module.exports = {
  getContacts,
  getContactsById,
  insertContact,
  updateContact,
  deleteContact
};
