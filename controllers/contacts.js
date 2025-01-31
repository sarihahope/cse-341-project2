const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
    // #swagger.tags=['Contacts']
    mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .find()
        .toArray((err, contacts) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(contacts);
            }
        });
};

        
//     const result = await mongodb.getDatabase().db().collection('contacts').find();
//     result.toArray().then((contacts) => {
//          res.setHeader('Content-Type', 'application/json');
//          res.status(200).json(contacts);
//     });
// };

const getSingle = async (req, res) => {
        // #swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .find({_id: userId})
    .toArray((err, contacts) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0])
        }
    });
};
//    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: userId});
//    result.toArray().then((contacts) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(contacts[0]);
//    });


const createContact = async (req, res) => {
        // #swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to create contact');
    }
};

const updateContact = async (req, res) => {
        // #swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, contact);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to update contact');
    }
}

const deleteContact = async (req, res) => {
        // #swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to delete contact');
    }
}

module.exports = {
    getContacts,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};