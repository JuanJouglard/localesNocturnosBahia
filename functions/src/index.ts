import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const serviceAccount = require('../proyectoiaw-757a3-firebase-adminsdk-adfpp-7d5ef461a2.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://proyectoiaw-757a3.firebaseio.com',
});
const db = admin.firestore();

export const getAttendance = functions.https.onRequest(
  async (request, response) => {
    const docs = await db.collection('Attendance').get();
    return response.json(docs.docs[0].data());
  },
);

export const getActiveAttendance = functions.https.onCall(
  async (data, context) => {
    const actives = await db
      .collection('Attendance')
      .where('userId', '==', data.userId)
      .get();
    const placesPromises = actives.docs.map(active =>
      db
        .collection('Places')
        .where('id', '==', active.data().placeID)
        .get(),
    );
    const respectivePlaces = await Promise.all(placesPromises);
    const responseToSend = actives.docs.map(active => {
      const correctPlace = respectivePlaces.find(
        place => place.docs[0].data().id === active.data().placeID,
      );
      const completeObject = {
        activeEntry: active.data(),
        activeId: active.id,
        place: correctPlace?.docs[0].data(),
      };
      return completeObject;
    });
    return {attendanceData: responseToSend};
  },
);
