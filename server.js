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

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is required'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true,'price is required'],
    }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'The Park Camper',
    price: 500
});

testTour.save().then(doc => {
    console.log(doc);
}).catch(err => {
    console.log("Error");
})

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});