const sqlite = require('better-sqlite3');
const conn = sqlite('MusicPlayer.db')

// all() is used with SELECT queries
function all(query, params = {}) {
    //prepare statement
    const statement = conn.prepare(query)
    return statement.all(params)
}

// get() returns only the value for the specified key if the key exists in the database
// if not it returns none
function get(query, params = {}) {
    //prepare statement
    const statement = conn.prepare(query)
    // console.log(statement.get(params),'statement')
    return statement.get(params)
}

// run() is used with when a query does a change in the database
function run(query, params = {}) {
    //prepare statement
    const statement = conn.prepare(query)
    return statement.run(params)
}

// functions to communicate inbetween the database and Node 
// and can be imported to use them anywhere in our code
module.exports = {

    // used for login in auth.js
    getUserByUsername(username) {
        let user = get(`SELECT * FROM User WHERE User.Username = @username`, { username: username })
        return user
    },

    // register new account
    createNewAccount(newUser) {
        const query = `INSERT INTO User(FullName, Username, Password, Email) VALUES(@FullName, @Username, @Password, @Email)`
        return run(query, newUser)
    },

    // gets all users and their playlists
    getUserPlaylists() {
        let user = all(`SELECT User.*, p.Playlist_name AS playlist FROM User
        LEFT JOIN PLAYLIST AS p
        ON user_id = User.id`)
        return convertUserPlaylists(user)
    },

    // gets specific user by id and its playlists
    getUserById(id) {
        let user = all(`SELECT User.*, p.Playlist_name AS playlist FROM User
        LEFT JOIN PLAYLIST AS p
        ON user_id = User.id
        WHERE User.id = @id`, { id: id })
        return convertUserPlaylists(user)[0]
    },

    // create a new playlist
    createNewPlaylist(newPlaylist) {
        const query = `INSERT INTO PLAYLIST(Playlist_name, user_id) VALUES (@Playlist_name, @user_id)`
        return run(query, newPlaylist)
    },

    // add song to playlist
    insertSong(addedSong) {
        const query = `INSERT INTO Song(Song_name, Artist, Album, user_id, playlist_id) VALUES(@Song_name, @Artist, @Album, @user_id, @playlist_id)`
        return run(query, addedSong)
    }
}

// function to convert duplicated user rows when using the all() function
// into separate user rows with playlists in an array
function convertUserPlaylists(user) {
    // array to keep track of user ids
    const ids = []
    //array to store duplicated users
    const converted = []

    for (let users of user) {
        // check that we don't duplicate the user
        if (!ids.includes(users.id)) {
            converted.push({
                id: users.id,
                FullName: users.FullName,
                Username: users.Username,
                Email: users.Email,
                PLAYLIST: []
            })
        }

        // add id to the tracking list
        ids.push(users.id)

        if (users.playlist) {
            //get the last converted user and add favorite songs to its list
            let convertedUser = converted[converted.length - 1]
            convertedUser.PLAYLIST.push({
                Playlist_name: users.Playlist_name
            })
        }
    }

    return converted

}



