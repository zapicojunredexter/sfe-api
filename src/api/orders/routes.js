const express = require("express");

const routesController = require('./controller');

const router = express.Router();

router
    .route("/orders")
    .get(routesController.fetch)
    .post(routesController.add);
    
module.exports = router;