const admin = require('firebase-admin');

class Route {
  static getCollection() {
    return admin.firestore().collection('orders');
  }

  static async create(params) {
    const toBeAdded = {
      ...params,
      createdAtMs: admin.firestore.FieldValue.serverTimestamp(),
      updatedAtMs: admin.firestore.FieldValue.serverTimestamp(),
      deleted: false,
    };

    const docRef = Route.getCollection().doc();

    await docRef.set({
      id: docRef.id,
      ...toBeAdded,
    });

    const newlyAdded = {
      id: docRef.id,
      ...toBeAdded,
    };

    return newlyAdded;
  }

  static async retrieve(id) {
    const result = await Route.getCollection()
      .doc(id)
      .get();
    if (result.exists) {
      return { id, ...result.data() };
    }

    return null;
  }

  static async update(id, params) {
    const toBeUpdated = {
      ...params,
      updatedAtMs: admin.firestore.FieldValue.serverTimestamp(),
    };

    await Route.getCollection()
      .doc(id)
      .update(toBeUpdated);

    return toBeUpdated;
  }

  static async delete(id) {
    const toBeUpdated = {
      updatedAtMs: admin.firestore.FieldValue.serverTimestamp(),
      deleted: true,
    };

    await Route.getCollection()
      .doc(id)
      .update(toBeUpdated);

    return toBeUpdated;
  }

  static async retrieveAll() {
    const result = await Route.getCollection().get();

    return result.docs.map((data) => ({ Id: data.id, ...data.data() }));
  }
}

module.exports = Route;
