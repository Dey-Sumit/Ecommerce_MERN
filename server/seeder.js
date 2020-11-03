import mongoose from 'mongoose';
import 'colors';

import dotenv from 'dotenv';
dotenv.config();

import users from './data/users.js';
import products from './data/products.js'

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

//! Create a function
mongoose.connect(process.env.DATABASE_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DATABASE connected-----".cyan.bold))
    .catch(error => console.log("DATABASE CONNECTION FAILED ".red.underline.bold, error))

const importData = async () => {

    try {
        // delete everything first !NO DUPLICATION
        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        // add user for every product
        const sampleProducts = products.map(product => {
            return {
                ...product, user: adminUser
            }
        })

        await Product.insertMany(sampleProducts)

        console.log("Data imported".green.inverse);
        process.exit()


    } catch (error) {
        console.log("Data not imported".red.bold, error.message);
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        // delete everything first !NO DUPLICATION
        await users.deleteMany()
        await products.deleteMany()
        await User.deleteMany()

        console.log("Data destroyed".yellow.inverse);
        process.exit()

    } catch (error) {
        console.log("Data not destroyed".red.bold, error.message);
        process.exit(1)
    }
}

if (process.argv[2] == '-d') {
    destroyData()
}
else {
    importData()
}