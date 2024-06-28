const db = require('../models/model')
const jwt = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('../helpers/hash')

const JWT_SECRET = "secret"

const register = async (req, res) => {
    const { username, password, email } = req.body;
    // console.log(username, password, email);
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await hashPassword(password);

        var sql = `SELECT username, email FROM users`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            rows.forEach(row => {
                if (row.username === username) {
                    return res.status(400).json({ message: 'Username already exists' });
                }
                else if (row.email === email) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                else {
                    var sql = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
                    db.run(sql, [username, hashedPassword, email], (err) => {
                        if (err) {
                            return res.status(400).json({ message: err.message });
                        }
                        jwt.sign({ id: row.id }, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                            if (err) {
                                return res.status(400).json({ message: err.message });
                            }
                        return res.status(201).cookie('token', token).json({ message: 'User created successfully' });
                        });
                    });
                }
            });
        });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.get(sql, [email], async (err, row) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            if (!row) {
                return res.status(400).json({ message: 'User not found' });
            }
            const match = await comparePassword(password, row.password);

            if (!match) {
                return res.status(400).json({ message: 'Incorrect password' });
            }
            if (match) {
                jwt.sign({ id: row.id }, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        return res.status(400).json({ message: err.message });
                    }
                    return res.cookie('token', token).json({ token, message: 'Login successful' });
                    // return res.status(200).json({ message: 'Login successful' });
                });

            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const profile = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(400).json({ message: 'Token not found' });
    }

    try {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            const sql = `SELECT * FROM users WHERE id = ?`;
            db.get(sql, [decoded.id], (err, row) => {
                if (err) {
                    return res.status(400).json({ message: err.message });
                }
                return res.status(200).json(row);
            });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
}

module.exports = {
    register,
    login,
    profile,
    logout
}