const sqlite = require('better-sqlite3');
const conn = sqlite('MusicPlayer.db')


function all(query, params = {}) {
    //prepare statement
    const statement = conn.prepare(query)
    return statement.all(params)
}

function run(query, params = {}) {
    //prepare statement
    const statement = conn.prepare(query)
    return statement.run(params)
}



module.exports = {
    getUser() {
        let user = all(`
        SELECT FullName FROM User
        `)
        return all(query, user)
    },
    insertSong(song) {

        const query = 'INSERT INTO FAVORITES(song, artist, album) VALUES(@song, @artist, @album)'
        return run(query, song)
    }
}

console.table(all(`
    SELECT * FROM User
`))

// let user = {
//     FullName: 'Loki Odinsson',
//     Username: 'lokiloki',
//     Password: 'abc123',
//     Email: 'loki.odinsson@mail.com'
// }

// let insertUserQuery = 'INSERT INTO User(FullName, Username, Password, Email) VALUES(@FullName, @Username, @Password, @Email)'

// let result = run(insertUserQuery, user)

//console.log(result)



// let query = 'SELECT * FROM User'

// let user = all(query)
// console.log(user)

//const statement = conn.prepare(query)

//let user = statement.all()

//console.log(user);