
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import admin from 'firebase-admin';

// --- Client-Side Firebase ---
const firebaseConfig = {
    "projectId": "agrisolutions-hub-r8znq",
    "appId": "1:867741380271:web:28f71d1e3b8a1bb6bbee5a",
    "storageBucket": "agrisolutions-hub-r8znq.firebasestorage.app",
    "apiKey": "AIzaSyCgAy9pMSft5n2RImTTf6JHhT7YdZZgLRs",
    "authDomain": "agrisolutions-hub-r8znq.firebaseapp.com",
    "measurementId": "",
    "messagingSenderId": "867741380271"
};

let app: FirebaseApp;
let db: Firestore;

if (typeof window !== 'undefined') {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
}

// --- Admin SDK (Server-Side) Firebase ---
let adminApp: admin.app.App;

if (!admin.apps.length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    // This is for local development without the service account key
    // It will use Application Default Credentials
    adminApp = admin.initializeApp();
  }
} else {
  adminApp = admin.app();
}

const adminDb = admin.firestore();


// --- FCM (Client-Side) ---
const getFCMToken = async () => {
    if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator) {
        try {
            const messaging = getMessaging(app);
            // This is a placeholder VAPID key. In a real app, use a secure key from your Firebase console.
            const vapidKey = "BPE3J_2L0z8-GQo8p6YJ3e2E8r_e9E8c2K4X8c8X8X8X8X8X8X8X8X8X8X8X8X8X8X8";
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
    const messaging = getMessaging(app);
    return onMessage(messaging, (payload) => {
        console.log('Foreground message received. ', payload);
    });
}


export { app, db, adminDb, getFCMToken, onForegroundMessage };
