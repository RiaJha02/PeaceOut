const express = require('express');
const ConnectDB = require('./config/db');
const cors = require('cors');

const app = express();

//Connecting Database
ConnectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

//Defining Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
