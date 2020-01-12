const admin = require('firebase-admin');
const { statusCodes, buildResponse } = require('../models/Response');
const { stripe } = require('../../services/stripe.service');
const { CURRENCY } = require('../../config/config');
const Order = require('./model');

exports.fetch = (req, res) => {
  try {
    return res.status(statusCodes.OK).send(null);
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send(buildResponse(err.message, err));
  }
};

exports.fetchAll = async (req, res) => {
  try {
    return res.status(statusCodes.OK).send(null);
  } catch (error) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send(buildResponse('server_error', error));
  }
};

exports.add = async (req, res) => {
  try {
    const { body } = req;
    const { token, chargeable } = body;

    const orderDoc = Order.getCollection().doc();

    const charge = await stripe.charges.create({
      amount: chargeable,
      currency: CURRENCY,
      source: token,
      metadata: {
        orderId: orderDoc.id,
      },
    });

    const order = {
      ...body,
      charge: charge.id,
      createdAtMs: admin.firestore.FieldValue.serverTimestamp(),
      updatedAtMs: admin.firestore.FieldValue.serverTimestamp(),
      deleted: false,
    };
    await orderDoc.create(order);
    return res.status(statusCodes.OK).send({ id: orderDoc.id, ...order });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send(buildResponse(err.message, err));
  }
};

exports.update = (req, res) => {
  try {
    return res.status(statusCodes.OK).send(null);
  } catch (error) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send(buildResponse('server_error', error));
  }
};

exports.delete = (req, res) => {
  try {
    return res.status(statusCodes.OK).send(null);
  } catch (error) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send(buildResponse('server_error', error));
  }
};
