/* eslint-disable @typescript-eslint/no-explicit-any */
// config/firebaseClient.ts

// lib/firebase-client.ts
let app: any = null;
let db: any = null;

export async function getFirebaseClient() {
    if (typeof window === "undefined") {
        return { app: null, db: null };
    }

    if (!app) {
        const { initializeApp } = await import("firebase/app");
        const { getFirestore } = await import("firebase/firestore");

        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: "ms-loop-clone-db.firebaseapp.com",
            projectId: "ms-loop-clone-db",
            storageBucket: "ms-loop-clone-db.appspot.com",
            messagingSenderId: "917737035888",
            appId: "1:917737035888:web:b9fcf172f6c838859c3cb5",
            measurementId: "G-1S3R0P94R5",
        };

        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    }

    return { app, db };
}
