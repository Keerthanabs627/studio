
'use server';

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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


// --- Client-Side Firebase ---
// This is safe to run on the server and the client
let app: FirebaseApp;
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const db: Firestore = getFirestore(app);

// --- Admin SDK (Server-Side) Firebase ---
let adminApp: admin.app.App;
if (!admin.apps.length) {
    // When deployed to App Hosting, GOOGLE_APPLICATION_CREDENTIALS is automatically set.
    // In a local environment, you can set this environment variable to point to your service account key.
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
       adminApp = admin.initializeApp({
          credential: admin.credential.applicationDefault(),
       });
    } else {
       // Fallback for local development without the env var set.
       // This will work if you have run `gcloud auth application-default login`.
       adminApp = admin.initializeApp();
    }
} else {
    adminApp = admin.app();
}

const adminDb = getAdminFirestore(adminApp);


// --- FCM (Client-Side) ---
const getFCMToken = async () => {
    if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator && app) {
        try {
            const messaging = getMessaging(app);
            // IMPORTANT: Replace with your actual VAPID key
            const vapidKey = "YOUR_VAPID_KEY_HERE";
            if (vapidKey === "YOUR_VAPID_KEY_HERE") {
                console.error("VAPID key not set. Please set it in src/lib/firebase.ts");
                return null;
            }
            const token = await getToken(messaging, { vapidKey });
            return token;
        } catch (error) {
            console.error("Error getting FCM token:", error);
            return null;
        }
    }
    return null;
}

const onForegroundMessage = () => {
    if (typeof window !== 'undefined' && app) {
      const messaging = getMessaging(app);
      return onMessage(messaging, (payload) => {
          console.log('Foreground message received. ', payload);
      });
    }
    return () => {}; // Return an empty unsubscribe function on the server
}


export { app, db, adminDb, getFCMToken, onForegroundMessage };
