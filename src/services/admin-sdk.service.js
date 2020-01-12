// const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('../config/streetfood-express-firebase-adminsdk-daf53-4b1712bd74.json');


module.exports = {
  initDefaultApp: () => {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://streetfood-express.firebaseio.com',
    });
  },
};
