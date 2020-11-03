import express from 'express';
import bodyParser from 'body-parser';
import products from './data/products.js';
import cors from 'cors';
import mongoose from 'mongoose';
import colors from 'colors';

import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.json(products)
})


app.listen(PORT, () => {
    console.log(`server is listing on ${PORT}-----`.yellow.bold)
    mongoose.connect(process.env.DATABASE_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("DATABASE connected-----".cyan.bold))
        .catch(error => console.log("DATABASE CONNECTION FAILED ".red.underline.bold, error))
}
);