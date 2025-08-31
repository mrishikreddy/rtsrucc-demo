import admin from "firebase-admin";
import { NextResponse } from "next/server";

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const db = admin.firestore();
const AGG_REF = db.collection("Admin").doc("aggregateDoc");

export async function GET() {
  try {
    const doc = await AGG_REF.get();
    if (!doc.exists) {
      return NextResponse.json({
        date: '',
        time: '',
        link: '/exam',
        examName: '',
        resourcesLink: ''
      });
    }

    const data = doc.data();
    const examDetails = data.ExamDetails || {};

    return NextResponse.json({
      date: examDetails.date || '',
      time: examDetails.time || '',
      link: examDetails.link || '/exam',
      examName: examDetails.examName || '',
      resourcesLink: examDetails.resourcesLink || ''
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
