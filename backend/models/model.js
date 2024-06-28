const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./models/FinAlign.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    // else {
    //     console.log('Connected to the zenlist database.');
    // }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
        );`, (err) => {
        if (err) {
            console.error('Error creating users table', err.message);
        } 
        // else {
        //     console.log('Users table created or already exists.');
        // }
    });
});


module.exports = db;