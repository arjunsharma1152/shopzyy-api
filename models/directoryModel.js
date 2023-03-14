const mongoose = require('mongoose');

const DirectorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true,'title is required'],
        unique: true
    },
    imageUrl: {
        type: String,
        trim: true,
        required: [true,'route is required'],
        unique: true
    },
    linkUrl: {
        type: String,
        trim: true,
        required: [true,'route is required'],
        unique: true
    },
    size: {
        type: String,
        default: ""
    }
});

const Directory = mongoose.model('Directory', DirectorySchema);

module.exports =  Directory;
