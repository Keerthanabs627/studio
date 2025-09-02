// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "agrisolutions-hub-r8znq",
  "appId": "1:867741380271:web:28f71d1e3b8a1bb6bbee5a",
  "storageBucket": "agrisolutions-hub-r8znq.firebasestorage.app",
  "apiKey": "AIzaSyCgAy9pMSft5n2RImTTf6JHhT7YdZZgLRs",
  "authDomain": "agrisolutions-hub-r8znq.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "867741380271"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const getFCMToken = async () => {
    if (typeof window !== "undefined") {
        try {
            const messaging = getMessaging(app);
            const vapidKey = "YOUR_VAPID_KEY_HERE"; // IMPORTANT: Replace with your actual VAPID key from Firebase Console
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
    if (typeof window !== 'undefined') {
        const messaging = getMessaging(app);
        return onMessage(messaging, (payload) => {
            console.log('Foreground message received. ', payload);
            // You can show a custom notification/toast here
        });
    }
    return () => {}; // Return an empty unsubscribe function for SSR
}


export { app, db, getFCMToken, onForegroundMessage };
