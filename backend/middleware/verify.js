import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret'; // Ensure this is properly set in your environment variables

export const verifyToken = (token) => {

    if (!token) {
        return { message: 'No token provided' };
    }

    try {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            const user_id = decoded.id;
            return user_id;
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = verifyToken;