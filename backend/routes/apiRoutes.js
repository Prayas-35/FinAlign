const express = require('express');
const router = express.Router();
const cors = require('cors');
const db = require('../models/model');
const { getBalance, transactions, getTransactions, deleteTransactions } = require('../controllers/apiControl');


const allowedOrigins = ['https://finalign.vercel.app', 'http://localhost:3000'];

router.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/balance', getBalance);
router.post('/transactions', transactions);
router.post('/getTransactions', getTransactions);
router.delete(`/deletransactions/:id`, deleteTransactions);

module.exports = router;