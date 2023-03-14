const express = require('express');

const directoryController = require('../controllers/directoryController');

const router = express.Router();

router.route("/").get(directoryController.getDirectory).post(directoryController.addDirectory);

module.exports = router;