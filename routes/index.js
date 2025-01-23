const router = require('express').Router();


router.get('/', (req, res) => { 
    res.send('Hello World!') });

router.use('/people', require('./people'));



module.exports = router;