const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', require('./routes/authRoutes'));

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`)
})
