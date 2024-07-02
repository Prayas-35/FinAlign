const db = require('../models/model')
const jwt = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('../helpers/hash')

const JWT_SECRET = "secret"

const register = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await hashPassword(password);

        // Check if username or email already exists
        const sql = `SELECT username, email FROM users WHERE username = ? OR email = ?`;
        db.get(sql, [username, email], (err, row) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            if (row) {
                if (row.username === username) {
                    return res.status(400).json({ message: 'Username already exists' });
                } else if (row.email === email) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
            } else {
                // Insert new user
                const sqlInsertUser = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
                db.run(sqlInsertUser, [username, hashedPassword, email], function (err) {
                    if (err) {
                        return res.status(400).json({ message: err.message });
                    }

                    const userId = this.lastID; // Get the last inserted ID

                    // Create JWT token
                    jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '168h' }, (err, token) => {
                        if (err) {
                            return res.status(400).json({ message: err.message });
                        }

                        // Insert initial balance for the new user
                        const sqlInsertFinance = `INSERT INTO finance (balance, user_id) VALUES (?, ?)`;
                        db.run(sqlInsertFinance, [0, userId], (err) => {
                            if (err) {
                                return res.status(400).json({ message: err.message });
                            }

                            // Insert initial total income and total expenditure for the new user
                            const sqlInsertTotal = `INSERT INTO total (total_income, total_expenditure, user_id) VALUES (?, ?, ?)`;
                            db.run(sqlInsertTotal, [0, 0, userId], (err) => {
                                if (err) {
                                    return res.status(400).json({ message: err.message });
                                }

                                return res.status(200).json({ token: token, message: 'User created' });
                            });
                        });
                    });
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

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
                jwt.sign({ id: row.id }, JWT_SECRET, { expiresIn: '168h' }, (err, token) => {
                    if (err) {
                        return res.status(400).json({ message: err.message });
                    }
                    return res.status(200).json({ token: token, message: 'Login successful' });
                    // return res.cookie('token', token).json({ token, message: 'Login successful' });
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