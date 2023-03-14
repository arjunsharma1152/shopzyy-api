const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const Directory = require("../../models/directoryModel");

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB connection successful")
);
 
const directory = JSON.parse(fs.readFileSync(`${__dirname}/directory.json`,'utf-8'));

const importData = async () => {
    try{
        await Directory.create(directory);
        console.log("Data Loaded");
    } catch (err){
        console.log(err);
    }
    process.exit();
};

const deleteData = async () => {
    try{
        await Directory.deleteMany();
        console.log("Data Deleted");
    } catch (err){
        console.log(err);
    }
    process.exit();
};

if(process.argv[2] === "--import"){
    importData();
}else if(process.argv[2] === "--delete"){
    deleteData();
}