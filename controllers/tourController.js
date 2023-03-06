const Tour = require('../models/tourModel');
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev_data/data/tours-simple.json`));

// exports.checkBody = (req,res,next) => {
//     if(!req.body.name || !req.body.price){
//         return res.status(400).json({
//             status: "fail",
//             message: "missing price or name"
//         })
//     }
//     next();
// }

exports.getAllTours = async (req,res) => {
    try{
        const queryObject = {...req.query};
        const excludedFields = ['page','limit','sort','fields'];

        excludedFields.forEach(el => delete queryObject[el]);

    let queryString = JSON.stringify(queryObject);

    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    const query = Tour.find(JSON.parse(queryString));

    const tours = await query;

    // const tours = await Tour.find().where('duration').equals(5);

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {tours}
    })
} catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err
    })
}
    };

exports.getTour = async (req,res) => {  
    try{
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                tour 
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    };

exports.updateTour = async (req,res) => {

    try{
       const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.addTour = async (req,res) => {
    try{
    // const newTour = new Tour({});
    // newTour.save()

    const newTour = await Tour.create(req.body);    
    
    res.status(201).json({
        status: "success",
        data: {
            tour: newTour
        }
    })
} catch (err) {
    res.status(400).json({
        status: "fail",
        message: "Invalid data sent"
    })
}
};

exports.deleteTour = async (req,res) => {

    try{
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success"
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};