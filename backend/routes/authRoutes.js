const express = require('express');
const router = express.Router();
const cors = require('cors');
const { register, login, profile, logout } = require('../controllers/authControl');
const db = require('../models/model');


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

router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile);
router.post('/logout', logout);

// router.get('/users', (req, res) => {
//     db.all(`SELECT * FROM users`, [], (err, rows) => {
//         if (err) {
//             return res.status(500).json({ message: err.message });
//         }
//         res.json(rows);
//     });
// });

module.exports = router;