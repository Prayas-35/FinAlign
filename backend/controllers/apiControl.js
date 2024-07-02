const verifyToken = require('../middleware/verify');
const db = require('../models/model');

const getBalance = async (req, res) => {
    const token = req.headers['authorization'] || req.get('Authorization');
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized' });
    }
    console.log('Token:', token);

    try {
        const userId = await verifyToken(token);
        console.log('User ID:', userId);

        const financeRow = await new Promise((resolve, reject) => {
            db.get(`SELECT balance FROM finance WHERE user_id = ?`, [userId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        const totalRow = await new Promise((resolve, reject) => {
            db.get(`SELECT total_income, total_expenditure FROM total WHERE user_id = ?`, [userId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        const response = {
            balance: financeRow.balance,
            total_income: totalRow.total_income,
            total_expenditure: totalRow.total_expenditure,
            userId: userId
        };
        console.log(response);
        return res.json(response);

    } catch (error) {
        console.error('Error fetching balance:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const transactions = async (req, res) => {
    const token = req.headers['authorization'] || req.get('Authorization');
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    try {
        const userId = await verifyToken(token);
        console.log('User ID:', userId);

        const { date, category, type, amount } = req.body;
        if (!date || !category || !type || !amount) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        let finalAmount = parseFloat(amount);
        if (isNaN(finalAmount)) {
            return res.status(400).json({ message: 'Amount must be a number' });
        }

        if (type === 'expense') {
            finalAmount = -finalAmount;
        }

        await new Promise((resolve, reject) => {
            db.run(`INSERT INTO log (user_id, amount, category, type, date) VALUES(?, ?, ?, ?, ?)`, [userId, finalAmount, category, type, date], function (err) {
                if (err) {
                    reject(err);
                } else {
                    console.log('Transaction inserted with ID:', this.lastID);
                    resolve(this.lastID);
                }
            });
        });

        await new Promise((resolve, reject) => {
            db.run(`UPDATE finance SET balance = balance + ? WHERE user_id = ?`, [finalAmount, userId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Balance updated');
                    resolve();
                }
            });
        });

        if (finalAmount < 0) {
            await new Promise((resolve, reject) => {
                db.run(`UPDATE total SET total_expenditure = total_expenditure + ? WHERE user_id = ?`, [finalAmount, userId], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('Total expenditure updated');
                        resolve();
                    }
                });
            });
        } else {
            await new Promise((resolve, reject) => {
                db.run(`UPDATE total SET total_income = total_income + ? WHERE user_id = ?`, [finalAmount, userId], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('Total income updated');
                        resolve();
                    }
                });
            });
        }

        return res.status(201).json({ message: 'Transaction added' });

    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getTransactions = async (req, res) => {
    const token = req.headers['authorization'] || req.get('Authorization');
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    try {
        const userId = await verifyToken(token);
        console.log('User ID:', userId);

        const rows = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM log WHERE user_id = ?`, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        console.log(rows);
        return res.json(rows);

    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteTransactions = async (req, res) => {
    const token = req.headers['authorization'] || req.get('Authorization');
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    let userId;
    try {
        userId = await verifyToken(token);
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Error verifying token' });
    }

    console.log('User ID:', userId);

    const transactionId = req.params.id;

    try {
        const row = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM log WHERE id = ? AND user_id = ?', [transactionId, userId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (!row) {
            return res.status(404).json({ message: 'Transaction not found or not authorized' });
        }

        const amount = parseFloat(row.amount);

        const updateQueries = [
            new Promise((resolve, reject) => {
                if (amount < 0) {
                    db.run('UPDATE total SET total_expenditure = total_expenditure + ? WHERE user_id = ?', [Math.abs(amount), userId], function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    db.run('UPDATE total SET total_income = total_income - ? WHERE user_id = ?', [amount, userId], function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            }),
            new Promise((resolve, reject) => {
                db.run('UPDATE finance SET balance = balance - ? WHERE user_id = ?', [amount, userId], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }),
            new Promise((resolve, reject) => {
                db.run('DELETE FROM log WHERE id = ? AND user_id = ?', [transactionId, userId], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
        ];

        await Promise.all(updateQueries);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        console.error('Error during transaction update:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getProfile = async (req, res) => {
    const token = req.headers['authorization'] || req.get('Authorization');
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    try {
        const userId = await verifyToken(token);
        console.log('User ID:', userId);

        const row = await new Promise((resolve, reject) => {
            db.get(`SELECT username FROM users WHERE id = ?`, [userId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        return res.json(row);

    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getBalance,
    transactions,
    getTransactions,
    deleteTransactions,
    getProfile
};
