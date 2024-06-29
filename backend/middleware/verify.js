const jwt = require('jsonwebtoken')

const JWT_SECRET = 'secret'; // Ensure this is properly set in your environment variables

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject({ message: 'No token provided' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject({ message: 'Invalid token' });
            }

            const user_id = decoded.id;
            // console.log('User ID:', user_id);
            resolve(user_id);
        });
    });
};


// verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzE5Njg3OTA4LCJleHAiOjE3MTk2OTE1MDh9.1LphxHsApcLkcMcZcYEH3LCsYJTsxO6sBNlNfbbFVTs')
//     // .then(userId => console.log('Verified User ID:', userId))
//     .catch(error => console.error('Error:', error.message));

module.exports = verifyToken;