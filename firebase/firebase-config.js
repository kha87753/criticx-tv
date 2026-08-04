import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuBIMdWr-5EkH1Ia7mlgnJq84-zxLyGhc",
  authDomain: "criticx-tv-website-8cd9e.firebaseapp.com",
  projectId: "criticx-tv-website-8cd9e",
  storageBucket: "criticx-tv-website-8cd9e.firebasestorage.app",
  messagingSenderId: "733874149417",
  appId: "1:733874149417:web:0295dc7f4d875236b2e438",
  measurementId: "G-3JRYKH36S1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export
export { app, db, auth, analytics };