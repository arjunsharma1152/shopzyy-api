const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("DB connection successful")
);

// const testTour = new Tour({
//     name: 'The Park Camper',
//     price: 500
// });

// testTour.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log("Error");
// })

const port = 4000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});