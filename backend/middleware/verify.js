const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret'; // Ensure this is properly set in your environment variables

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            console.error('No token provided');
            return reject({ message: 'No token provided' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Invalid token:', err.message);
                return reject({ message: 'Invalid token', error: err.message });
            }

            const user_id = decoded.id;
            console.log('Decoded User ID:', user_id);
            resolve(user_id);
        });
    });
};

module.exports = verifyToken;