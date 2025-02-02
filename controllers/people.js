const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getPeople = async (req, res) => {
        // #swagger.tags=['People']
//             mongodb
//                 .getDatabase()
//                 .db()
//                 .collection('people')
//                 .find()
//                 .toArray((err, people) => {
//                     if (err) {
//                         res.status(500).json(err);
//                     } else {
//                         res.setHeader('Content-Type', 'application/json');
//                         res.status(200).json(people);
//                     }
//                 });
// };
    const result = await mongodb.getDatabase().db().collection('people').find();
    result.toArray().then((people) => {
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(people);
    });
};

const getSingle = async (req, res) => {
            // #swagger.tags=['People']
    const userID = new ObjectId(req.params.id);
//         mongodb
//             .getDatabase()
//             .db()
//             .collection('people')
//             .find()
//             .toArray((err, people) => {
//                 if (err) {
//                     res.status(500).json(err);
//                 } else {
//                     res.setHeader('Content-Type', 'application/json');
//                     res.status(200).json(people[0])
//                 }
//             });
// };

   const result = await mongodb.getDatabase().db().collection('people').find({_id: userID});
   result.toArray().then((people) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(people[0]);
   });
};

const addPerson = async (req, res) => {
            // #swagger.tags=['People']
    const people = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favoriteFood: req.body.favoriteFood,
        favoriteAnimal: req.body.favoriteAnimal,
        car: req.body.car,
        randomNumber: req.body.randomNumber,
        randomDate: req.body.randomDate
    };    
    const result = await mongodb.getDatabase().db().collection('people').insertOne(people);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to create contact');
    }
};

const updatePerson = async (req, res) => {
            // #swagger.tags=['People']
    const userId = new ObjectId(req.params.id);
    const people = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favoriteFood: req.body.favoriteFood,
        favoriteAnimal: req.body.favoriteAnimal,
        car: req.body.car,
        randomNumber: req.body.randomNumber,
        randomNDate: req.body.randomDate
    };
    const result = await mongodb.getDatabase().db().collection('people').replaceOne({_id: userId}, people);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Failed to update person');
    }
};

const deletePerson = async (req, res) => {
            // #swagger.tags=['People']
const userId = new ObjectId(req.params.id);
const result = await mongodb.getDatabase().db().collection('people').deleteOne({_id: userId});
if (result.deletedCount > 0) {
    res.status(204).send();
} else {
    res.status(500).json(result.error || 'Failed to delete people');
}
};



module.exports = {
    getPeople,
    getSingle,
    addPerson,
    updatePerson,
    deletePerson
};

