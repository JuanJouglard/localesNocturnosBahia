import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const serviceAccount = require("../proyectoiaw-757a3-firebase-adminsdk-adfpp-7d5ef461a2.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://proyectoiaw-757a3.firebaseio.com"
  });
const db = admin.firestore();


export const getAttendance = functions.https.onRequest(async (request, response) => {
    const docs = await db.collection('Attendance').get();
    return response.json(docs.docs[0].data());
});


