const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/apiRoutes'));

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`)
})
