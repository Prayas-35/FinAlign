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
        db.get(`SELECT * FROM finance WHERE user_id = ?`, [userId], (err, row) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            console.log('Balance:', row.balance);
            return res.json({'balance': row.balance, 'userId': userId });
        });
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

const transactions = async (req, res) => {
    const token = req.headers.get('Authorization');
    if (!token) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    const userId = await verifyToken(token);
    console.log('User ID:', userId);

    const { date, category, description, type, amount } = req.body;

    if (!date || !category || !description || !type || !amount) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    else if (type === 'expense') {
        amount = -amount;
    }

    try {
        db.run(`INSERT INTO log (user_id, amount, category, type, description, date) VALUES(?, ?, ?, ?)`, [userId, amount, category, type, description, date], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            console.log('Transactions:', rows);
            return res.json({'transactions': rows, 'userId': userId });
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

module.exports = { 
    getBalance 
};
