const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://dbUser:Takedownfortwo2@cluster0.2v2aa.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongodb connection successfully established');
})

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})