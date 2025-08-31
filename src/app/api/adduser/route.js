import admin from "firebase-admin";
import { NextResponse } from "next/server";

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
  }
}

const db = admin.firestore();
const AGG_REF = db.collection("Admin").doc("aggregateDoc");

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const formattedEmail = email.toLowerCase();
    const userKey = formattedEmail.split("@")[0]; // Key without special characters

    // Read the aggregate doc (1 read)
    const aggSnap = await AGG_REF.get();
    const aggregateData = aggSnap.exists ? aggSnap.data() : {};

    // Initialize or get existing UserData and UserPoints
    const aggregateUserData = aggregateData.UserData || {};
    const aggregateUserPoints = aggregateData.UserPoints || {};

    // Get existing points
    const existingPoints = aggregateUserPoints[userKey]?.Points || 0;
    const finalPoints = existingPoints + 50;

    // Update aggregated UserData
    aggregateUserData[userKey] = {
      Name: name,
      Email: formattedEmail,
      Verified: false,
    };

    // Update aggregated UserPoints
    aggregateUserPoints[userKey] = {
      Points: finalPoints,
    };

    // Write the updated data back (1 write)
    await AGG_REF.set(
      {
        UserData: aggregateUserData,
        UserPoints: aggregateUserPoints,
      },
      { merge: true }
    );

    return NextResponse.json({ message: "User registered successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Firestore Write Error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
