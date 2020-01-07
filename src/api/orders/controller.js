const admin = require('firebase-admin');
const {statusCodes,buildResponse} = require('../models/Response');
const stripe = require('../../services/stripe.service');
const {getCollection: OrderCollection} = require('./model');

exports.fetch = (req, res) => {
    try {
        return res.status(statusCodes.OK).send(null);
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).send(buildResponse('server_error', error));
    }
}

exports.fetchAll = async (req, res) => {
    try {
        return res.status(statusCodes.OK).send(null);
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).send(buildResponse('server_error', error));
    }
}

exports.add = async (req, res) => {
    try {
        const { body } = req;
        const { token } = body;
        const chargeable = 100;

        const orderDoc = OrderCollection().doc();
        
        const charge = await stripe.charges.create({
            amount: chargeable,
            currency: CURRENCY,
            source: token,
            metadata: {
              orderId: orderDoc.id,
            },
        });

        const order = {
            charge,
            createdAtMs: admin.firestore.FieldValue.serverTimestamp(),
            updatedAtMs: admin.firestore.FieldValue.serverTimestamp(),
            deleted: false,
        };
        await orderDoc.create(order);
        return res.status(statusCodes.OK).send(null);
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).send(buildResponse('server_error', error));
    }
};

exports.update = (req, res) => {
    try {
        return res.status(statusCodes.OK).send(null);
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).send(buildResponse('server_error', error));
    }
};

exports.delete = (req, res) => {
    try {
        return res.status(statusCodes.OK).send(null);
    } catch (error) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).send(buildResponse('server_error', error));
    }
};
