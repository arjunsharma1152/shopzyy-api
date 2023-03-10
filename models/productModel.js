const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true,'title is required'],
        unique: true
    },
    routeName: {
        type: String,
        trim: true,
        required: [true,'route is required'],
        unique: true
    },
    items: [],
});

const Product = mongoose.model('Product', ProductSchema);

module.exports =  Product;
