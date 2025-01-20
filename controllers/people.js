const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getPeople = async (req, res) => {
    // #swagger.tags=['People']
    const result = await mongodb.getDatabase().db().collection('People').find();
    result.toArray().then((People) => {
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(People);
    });
};

const getSingle = async (req, res) => {
        // #swagger.tags=['People']
    const userId = new ObjectId(req.params.id);
   const result = await mongodb.getDatabase().db().collection('People').find({_id: userId});
   result.toArray().then((People) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(People[0]);
   });
};

const createPeople = async (req, res) => {
        // #swagger.tags=['People']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favoriteFood: req.body.favoriteFood,
        favoriteAnimal: req.body.favoriteAnimal,
        car: req.body.car,
        randomNumber: req.body.randomNumber,
        randomDate: req.body.randomDate
    };
    const result = await mongodb.getDatabase().db().collection('People').insertOne(contact);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to create contact');
    }
};

const updatePeople = async (req, res) => {
        // #swagger.tags=['People']
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favoriteFood: req.body.favoriteFood,
        favoriteAnimal: req.body.favoriteAnimal,
        car: req.body.car,
        randomNumber: req.body.randomNumber,
        randomDate: req.body.randomDate

    };
    const result = await mongodb.getDatabase().db().collection('People').replaceOne({_id: userId}, contact);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to update contact');
    }
}

const deletePeople = async (req, res) => {
        // #swagger.tags=['People']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('People').deleteOne({_id: userId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to delete contact');
    }
}

module.exports = {
    getPeople,
    getSingle,
    createPeople,
    updatePeople,
    deletePeople
};