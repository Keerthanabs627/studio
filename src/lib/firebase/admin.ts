// src/lib/firebase/admin.ts
import admin from 'firebase-admin';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';

const firebaseConfig = {
    "projectId": "agrisolutions-hub-r8znq",
    "appId": "1:867741380271:web:28f71d1e3b8a1bb6bbee5a",
    "storageBucket": "agrisolutions-hub-r8znq.firebasestorage.app",
    "apiKey": "AIzaSyCgAy9pMSft5n2RImTTf6JHhT7YdZZgLRs",
    "authDomain": "agrisolutions-hub-r8znq.firebaseapp.com",
    "measurementId": "",
    "messagingSenderId": "867741380271"
};

let adminApp: admin.app.App;
if (!admin.apps.length) {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
       adminApp = admin.initializeApp({
          credential: admin.credential.applicationDefault(),
       });
    } else {
       // Fallback for local development without the env var set.
       // This will work if you have run `gcloud auth application-default login`.
       adminApp = admin.initializeApp({
        projectId: firebaseConfig.projectId
       });
    }
} else {
    adminApp = admin.app();
}

const adminDb = getAdminFirestore(adminApp);

export { adminDb };
