const db = require('./database.js');
const express = require('express'); 
const app = express(); 

//body parser
app.use(express.json());



app.listen(4000, () => console.log('Server started at port 4000'));
