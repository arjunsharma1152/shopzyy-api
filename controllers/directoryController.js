const Directory = require('../models/directoryModel');

exports.getDirectory = async (req,res) => {
    const directory = await Directory.find();
    
    try{

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json({
        status: 'success',
        results: directory.length,
        data: {directory}
    })
} catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err
    })
}
}

exports.addDirectory = async (req,res) => {
    try{
    const newDirectory = await Directory.create(req.body);    
    
    res.status(201).json({
        status: "success",
        data: {
            directory: newDirectory
        }
    })
} catch (err) {
    console.log(err);
    res.status(400).json({
        status: "fail",
        message: "Invalid data sent"
    })
}
};