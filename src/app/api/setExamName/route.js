import admin from "firebase-admin";
import { NextResponse } from "next/server";

// Initialize Firebase Admin SDK if not already initialized
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
    const { examName } = await req.json();

    if (!examName) {
      return NextResponse.json({ error: "Exam name is required" }, { status: 400 });
    }

    await AGG_REF.set(
      {
        ExamDetails: { examName }
      },
      { merge: true }
    );

    return NextResponse.json({ message: "Exam name set successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
