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
app.get('/api/user', auth.authenticateJWT, (req, res) => {
    res.json(db.getUserPlaylists())
});

/* app.get('/api/user', (req, res) => {
    res.json(db.getUserPlaylists())
}) */

//get user by id and its playlists
app.get('/api/user/:id', auth.authenticateJWT, (req, res) => {
    let id = req.params.id
    res.json(db.getUserById(id))
})

// create new playlist
app.post('/api/playlist', auth.authenticateJWT, (req, res) => {
    let newPlaylist = req.body.Playlist_name
    let userId = req.user.id
    // inserts new playlist into the database PLAYLIST and sets its id to auto incremented id
    let insert = db.createNewPlaylist(newPlaylist, userId)
    newPlaylist.id = insert.lastInsertRowid
    //returns playlist with updated id
    res.json({newPlaylist, userId})
})

//delete playlist
app.delete('/api/playlist', auth.authenticateJWT,(req, res) => {
    const id = req.body

    try {
        let deletePlaylist = db.deletePlaylist(id);
        res.json(deletePlaylist);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failure',
            message: "Unable to delete playlist!"
        })
    }
})

// add song to user playlist
app.post('/api/user/playlist/:id/song', auth.authenticateJWT, (req, res) => {
    let playlistId = req.params.id
    let addedSong = req.body.song_id
    // inserts song into the playlist and sets its id to auto incremented id
    let insert = db.insertSong(playlistId, addedSong)
    addedSong.id = insert.lastInsertRowid
    //returns song with updated id
    res.json(addedSong)
})

//delete song from user playlist
app.delete('/api/playlist/:id/song', auth.authenticateJWT, (req, res) => {
    try {
        const deletedSong = db.deleteSong(req.params);
        res.json(deletedSong);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failure',
            message: "Unable to delete song from a playlist!"
        })
    }
})


app.listen(4000, () => console.log('Server started at port 4000'));
