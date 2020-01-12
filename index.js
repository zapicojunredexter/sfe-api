const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const adminSdk = require('./src/services/admin-sdk.service');

adminSdk.initDefaultApp();

const main = express();
main.use(cors());

const orderRoutes = require('./src/api/orders/routes');

main.use(orderRoutes);

exports.api = functions.https.onRequest(main);
