// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

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


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
