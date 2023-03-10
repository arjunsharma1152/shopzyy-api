const Product = require('../models/productModel');
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

exports.getAllProduct = async (req,res) => {
    try{
        const queryObject = {...req.query};
        const excludedFields = ['page','limit','sort','fields'];

        excludedFields.forEach(el => delete queryObject[el]);

    let queryString = JSON.stringify(queryObject);

    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    const query = Product.find(JSON.parse(queryString));

    const products = await query;

    // const tours = await Product.find().where('duration').equals(5);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {products}
    })
} catch (err) {
    res.status(404).json({
        status: 'fail',
        message: err
    })
}
    };

exports.getProduct = async (req,res) => {  
    try{
        const product = await Product.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                product 
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    };

exports.updateProduct = async (req,res) => {

    try{
       const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            data: {
                product
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.addProduct = async (req,res) => {
    try{
    // const newProduct = new Product({});
    // newProduct.save()

    const newProduct = await Product.create(req.body);    
    
    res.status(201).json({
        status: "success",
        data: {
            product: newProduct
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

exports.deleteProduct = async (req,res) => {

    try{
        await Product.findByIdAndDelete(req.params.id);

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