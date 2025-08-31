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

export async function POST(req) {
  try {
    const body = await req.text();
    const { data } = JSON.parse(body);

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Read the aggregate document using Admin SDK method (using .get())
    const aggRef = db.collection("Admin").doc("aggregateDoc");
    const aggSnap = await aggRef.get(); // Use .get() instead of getDoc
    let aggregate = aggSnap.exists ? aggSnap.data() : {};

    // Ensure the nested UserPoints object exists.
    if (!aggregate.UserPoints) {
      aggregate.UserPoints = {};
    }

    const results = [];

    // Process each entry and update the aggregate's UserPoints object in memory.
    for (const entry of data) {
      let { hallticket, points } = entry;

      if (!hallticket || typeof points !== "number") {
        results.push({ hallticket, status: "invalid entry" });
        continue;
      }

      // Normalize hallticket to lowercase.
      hallticket = hallticket.toLowerCase();

      // Get existing points from the aggregate; if not found, default to 0.
      const existingPoints = aggregate.UserPoints[hallticket] ? aggregate.UserPoints[hallticket].Points : 0;
      const newPoints = existingPoints + points;
      // Update the in-memory aggregate
      aggregate.UserPoints[hallticket] = { Points: newPoints };

      results.push({ hallticket, status: "updated", newPoints });
    }

    // Write back the updated UserPoints to the aggregate document (1 write)
    await aggRef.set({ UserPoints: aggregate.UserPoints }, { merge: true });

    return NextResponse.json({ message: "Points processed successfully", results }, { status: 200 });
  } catch (error) {
    console.error("Error processing points:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
