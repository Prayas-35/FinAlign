const express = require('express');
const router = express.Router();
const cors = require('cors');
const { register, login, profile, logout } = require('../controllers/authControl');
const db = require('../models/model');

router.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

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