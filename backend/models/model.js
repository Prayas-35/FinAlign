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

    db.run(`CREATE TABLE IF NOT EXISTS budget (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
        );`, (err) => {
        if (err) {
            console.error('Error creating budget table', err.message);
        }
        // else {
        //     console.log('Budget table created or already exists.');
        // }
    });

    db.run(`CREATE TABLE IF NOT EXISTS log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        category TEXT NOT NULL,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
        );`, (err) => {
        if (err) {
            console.error('Error creating log table', err.message);
        }
        // else {
        //     console.log('Log table created or already exists.');
        // }
    });

    db.run(`CREATE TABLE IF NOT EXISTS finance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        balance INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
        );`, (err) => {
        if (err) {
            console.error('Error creating finance table', err.message);
        }
        // else {
        //     console.log('Finance table created or already exists.');
        // }
    });

    db.run(`CREATE TABLE IF NOT EXISTS daily_average (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        average_expenditure REAL NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
        );`, (err) => {
        if (err) {
            console.error('Error creating daily_average table', err.message);
        }
        // else {
        //     console.log('Daily average table created or already exists.');
        // }
    });

    db.run(`CREATE TABLE IF NOT EXISTS monthly_average (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL,
        average_expenditure REAL NOT NULL,
        average_income REAL NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
        );`, (err) => {
        if (err) {
            console.error('Error creating monthly_average table', err.message);
        }
        // else {
        //     console.log('Monthly average table created or already exists.');
        // }
    });

    db.run(`CREATE TABLE IF NOT EXISTS stock (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        shares_number INTEGER,
        symbols TEXT NOT NULL,
        price INTEGER NOT NULL,
        time DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
        );`, (err) => {
        if (err) {
            console.error('Error creating stock table', err.message);
        }
        // else {
        //     console.log('Stock table created or already exists.');
        // }
    });

    db.run(`CREATE TABLE IF NOT EXISTS total (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        total_income REAL NOT NULL,
        total_expenditure REAL NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
        );`, (err) => {
        if (err) {
            console.error('Error creating stock table', err.message);
        }
        // else {
        //     console.log('Stock table created or already exists.');
        // }
    });
});

module.exports = db;