// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./Models/Clients_Models');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());


mongoose
.connect('mongodb://localhost:27017/mangoDB_sneakers_shop_V2')
.then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => { console.log('Example app listening on port', PORT) });  
})
.catch(err => console.log(err)); 

app.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users)
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json("err : ", err.message);
    }
});

app.post('/addUser', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json("err : ", err.message);
    }
});


