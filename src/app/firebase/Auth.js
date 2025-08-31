"use client"; 

import { auth } from "../firebase/firebase"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth"; 

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};


export const doSignOut = async () => {
  return auth.signOut();
};

export const doPasswordReset = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doSendEmailVerification = async () => {
  if (!auth.currentUser) throw new Error("No authenticated user");
  return sendEmailVerification(auth.currentUser, {
    url: `${typeof window !== "undefined" ? window.location.origin : ""}/home`,
  });
};
