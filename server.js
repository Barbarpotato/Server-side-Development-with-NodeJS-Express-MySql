// for the devopment env we can use the mysql2 instead mysql.
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const product = require('./routes/product.route')

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Node.js that supporting by Mysql Database!' });
});

app.use('/product', product);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`server is running on port ${PORT}.`));
