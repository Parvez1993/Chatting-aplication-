// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBZsFqzJpPEzBl0kYOykdfPRh1AwQ2d9EY",
  authDomain: "application-chat-67fba.firebaseapp.com",
  projectId: "application-chat-67fba",
  storageBucket: "application-chat-67fba.appspot.com",
  messagingSenderId: "930458417962",
  appId: "1:930458417962:web:f4bb74049799c24eb37c53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
