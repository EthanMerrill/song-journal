import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

var firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "song-journal.firebaseapp.com",
  projectId: "song-journal",
  storageBucket: "song-journal.appspot.com",
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {app, analytics};
