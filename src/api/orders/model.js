const admin = require('firebase-admin');

exports.getCollection = () => admin.firestore().collection('orders');

class Route {
    static async create (params) {
        const toBeAdded = {
            ...params,
            createdAtMs: admin.firestore.FieldValue.serverTimestamp(),
            updatedAtMs: admin.firestore.FieldValue.serverTimestamp(),
            deleted: false,
        };

        const docRef = getCollection().doc();
    
        await docRef.set({
            Id: docRef.id,
            ...toBeAdded
        });
    
        const newlyAdded = {
            id: docRef.id,
            ...toBeAdded
        };
    
        return newlyAdded;
    }
    
    static async retrieve (id) {
        const result = await getCollection()
            .doc(id)
            .get();
        if (result.exists) {
            return {Id: id,
                ...result.data()};
        }

        return null;
    }
    
    static async update (id, params) {
        const toBeUpdated = {
            ...params,
            updatedAtMs: admin.firestore.FieldValue.serverTimestamp(),
        };

        await getCollection()
            .doc(id)
            .update(toBeUpdated);

        return toBeUpdated;
    }
    
    static async delete (id) {
        const toBeUpdated = {    
            updatedAtMs: admin.firestore.FieldValue.serverTimestamp(),
            deleted: true
        };
    
        await getCollection()
          .doc(id)
          .update(toBeUpdated);
    
        return toBeUpdated;
    }
    
    static async retrieveAll () {
        const result = await getCollection().get();
    
        return result.docs.map((data) => ({Id: data.id,
            ...data.data()}));
    }
}

module.exports = Route;
