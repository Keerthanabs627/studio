// src/lib/firebase/client.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}
const db: Firestore = getFirestore(app);

export const getFCMToken = async () => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
        return null;
    }
    
    const messaging = getMessaging(app);
    try {
        const currentToken = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY_HERE' }); // Replace with your VAPID key
        if (currentToken) {
            console.log('FCM Token:', currentToken);
            return currentToken;
        } else {
            console.log('No registration token available. Request permission to generate one.');
            return null;
        }
    } catch (err) {
        console.error('An error occurred while retrieving token. ', err);
        return null;
    }
};

export const onForegroundMessage = () => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
        return () => {}; // Return an empty unsubscribe function on the server
    }

    const messaging = getMessaging(app);
    return onMessage(messaging, (payload) => {
        console.log('Foreground message received. ', payload);
        // You can display a toast notification here
        // e.g., using a toast library
        const notificationTitle = payload.notification?.title;
        const notificationBody = payload.notification?.body;
        if (notificationTitle && notificationBody) {
             // Example: new Notification(notificationTitle, { body: notificationBody });
        }
    });
}


export { app, db };
