const express = require('express');

const mongodb = require('./data/database');
const app = express();


const port = process.env.PORT || 3000;

app.use('/', require('./routes/index'));

mongodb.initdb((err) => {
    if (err) {
        console.log(err);
    }  
    else {
    app.listen(port, () => {console.log(`Server/node is running on port ${port}`)});    
    }

});

