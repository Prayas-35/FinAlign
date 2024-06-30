const finnhub = require('finnhub');
const verifyToken = require('../middleware/verify');
const db = require('../models/model');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cpvuo79r01qvs3kl5040cpvuo79r01qvs3kl504g"
const finnhubClient = new finnhub.DefaultApi()

const getStock = async (symbol) => {
    try {
        finnhubClient.quote(symbol, (error, data, response) => {
            if (error) {
                console.error('Error fetching stock data:', error);
                return;
            }

            if (data && data.c) {
                console.log(`Stock Price for ${symbol}: ${data.c}`);
            } else {
                console.log(`Symbol '${symbol}' is not valid or no data available.`);
            }
        });
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
};

// getStock("MSFT");

const getBalance = async (req, res) => {
    const token = req.headers['authorization'] || req.get('Authorization');
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    const userId = await verifyToken(token);
    console.log('User ID:', userId);

    try {
        db.get(`SELECT balance FROM finance WHERE user_id = ?`, [userId], (err, financeRow) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            
            db.get(`SELECT total_income, total_expenditure FROM total WHERE user_id = ?`, [userId], (err, totalRow) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                
                const response = {
                    balance: financeRow.balance,
                    total_income: totalRow.total_income,
                    total_expenditure: totalRow.total_expenditure,
                    userId: userId
                };
                console.log(response);
                return res.json(response);
            });
        });
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

const transactions = async (req, res) => {
    const token = req.headers['authorization'] || req.get('Authorization');
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

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

    try {
        db.run(`INSERT INTO log (user_id, amount, category, type, date) VALUES(?, ?, ?, ?, ?)`, [userId, finalAmount, category, type, date], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            console.log('Transaction inserted with ID:', this.lastID);
            db.run(`UPDATE finance SET balance = balance + ? WHERE user_id = ?`, [finalAmount, userId], (err, rows) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                console.log('Balance updated');
            });

            if (finalAmount < 0) {
                db.run(`UPDATE total SET total_expenditure = total_expenditure + ? WHERE user_id = ?`, [finalAmount, userId], (err, rows) => {
                    if (err) {
                        return res.status(500).json({ message: err.message });
                    }
                    console.log('Total expenditure updated');
                });
            }
            else {
                db.run(`UPDATE total SET total_income = total_income + ? WHERE user_id = ?`, [finalAmount, userId], (err, rows) => {
                    if (err) {
                        return res.status(500).json({ message: err.message });
                    }
                    console.log('Total income updated');
                });
            }

            return res.status(201).json({ message: 'Transaction added', transactionId: this.lastID });
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

const getTransactions = async (req, res) => {
    const token = req.headers['authorization'] || req.get('Authorization');
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    const userId = await verifyToken(token);
    console.log('User ID:', userId);

    try {
        db.all(`SELECT * FROM log WHERE user_id = ?`, [userId], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            console.log(rows);
            return res.json(rows);
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
};

module.exports = { 
    getBalance,
    transactions,
    getTransactions
};
