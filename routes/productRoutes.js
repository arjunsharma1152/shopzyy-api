const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();

// router.param('id',productController.checkId);

router.route("/").get(productController.getAllProduct).post(productController.addProduct);

router.route("/:id").get(productController.getProduct).patch(productController.updateProduct).delete(productController.deleteProduct);

module.exports = router;