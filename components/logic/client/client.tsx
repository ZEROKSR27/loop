/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getFirebaseClient } from "@/config/firebaseClient";

const AnalyticsLoader = () => {
    async function firebase() {
        const { analytics, app, db } = await getFirebaseClient();
    }

    return null;
};

export default AnalyticsLoader;
