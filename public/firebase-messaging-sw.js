// Scripts for Firebase products are imported from the CDN
// See: https://firebase.google.com/docs/web/setup#access-firebase
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  "projectId": "agrisolutions-hub-r8znq",
  "appId": "1:867741380271:web:28f71d1e3b8a1bb6bbee5a",
  "storageBucket": "agrisolutions-hub-r8znq.firebasestorage.app",
  "apiKey": "AIzaSyCgAy9pMSft5n2RImTTf6JHhT7YdZZgLRs",
  "authDomain": "agrisolutions-hub-r8znq.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "867741380271"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
