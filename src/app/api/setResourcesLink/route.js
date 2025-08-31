import admin from "firebase-admin";
import { NextResponse } from "next/server";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const db = admin.firestore();
const AGG_REF = db.collection("Admin").doc("aggregateDoc");

export async function POST(req) {
  try {
    const { resourcesLink } = await req.json();

    if (!resourcesLink || !resourcesLink.trim()) {
      return NextResponse.json({ message: 'Resources link is required.' }, { status: 400 });
    }

    await AGG_REF.set(
      {
        ExamDetails: { resourcesLink }
      },
      { merge: true }
    );

    return NextResponse.json({ message: "Resources link updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error setting resources link:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
