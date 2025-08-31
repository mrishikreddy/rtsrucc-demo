import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9StoBQizKwsn6Gn9Znrr_4rzRd6g9g1I",
  authDomain: "rt-srucc-demo.firebaseapp.com",
  projectId: "rt-srucc-demo",
  storageBucket: "rt-srucc-demo.firebasestorage.app",
  messagingSenderId: "145666371799",
  appId: "1:145666371799:web:1eccec0c8425a8361b8092",
  measurementId: "G-RZ2QHR3NPW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { app, auth };