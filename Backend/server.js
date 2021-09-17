const db = require('./database.js');
var bcrypt = require('bcryptjs');
var config = require('./config');
const express = require('express');
const auth = require('./auth.js');
const app = express();

//body parser
app.use(express.json());

//creating endpoint for login
app.post('/api/auth', (req, res) => {
    res.json(auth.login(req, res))
})

//registration of a new user
app.post('/api/user', (req, res) => {
    console.log(req.body)
    let newUser = req.body
    //hashing password before going into the database
    bcrypt.hash(newUser.Password, 10, (err, hash) => {
      //changing plane password to hashed one
      newUser.Password = hash
      // inserts new user into the database and sets its id to auto incremented id
      let insert = db.createNewAccount(newUser)
      newUser.id = insert.lastInsertRowid
      //returns user with updated id
      res.json(newUser)
    });
})

//get all users and their playlists
app.get('/api/user', (req, res) => {
    res.json(db.getUserPlaylists())
})

//get user by id and its playlists
app.get('/api/user/:id', (req, res) => {
    let id = req.params.id
    res.json(db.getUserById(id))
})

// create new playlist
app.post('/api/user/playlist', (req, res) => {
    let newPlaylist = req.body
     // inserts new playlist into the database PLAYLIST and sets its id to auto incremented id
    let insert = db.createNewPlaylist(newPlaylist)
    newPlaylist.id = insert.lastInsertRowid
    //returns playlist with updated id
    res.json(newPlaylist)
})


// add song to user playlist




app.listen(4000, () => console.log('Server started at port 4000'));
