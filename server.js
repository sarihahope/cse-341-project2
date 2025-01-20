const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes/index'));


app.listen(port, () => {console.log(`Server/node is running on port ${port}`)});