// Import the functions you need from the SDKs you need
// We use standard static imports here, which is typical for a module like this
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; // Needed because you have a measurementId

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // Safely pulls your API key from environment variables
    authDomain: "ms-loop-clone-db.firebaseapp.com",
    projectId: "ms-loop-clone-db",
    storageBucket: "ms-loop-clone-db.appspot.com",
    messagingSenderId: "917737035888", // Your project number
    appId: "1:917737035888:web:b9fcf172f6c838859c3cb5", // Your web app's unique ID
    measurementId: "G-1S3R0P94R5", // Your Google Analytics 4 Measurement ID
};

// Initialize Firebase
// This crucial check `!getApps().length` prevents re-initialization errors
// which commonly occur in development with Next.js hot reloading.
// It ensures Firebase is initialized only once.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get a reference to the Firestore service
const db = getFirestore(app);

// Get a reference to the Analytics service (optional)
// We add a check for `typeof window !== 'undefined'` because Google Analytics
// is a client-side only service, and this prevents errors during server-side rendering (SSR)
// in Next.js if you try to initialize it on the server.
let analytics;
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
    analytics = getAnalytics(app);
}

// Export the initialized services for use throughout your app
// This allows you to import `app`, `db`, and `analytics` wherever you need them.
export { app, db, analytics };
