✅ Tech Stack Chosen:
Frontend: Javascript and CSS
Database: Firebase Firestore (NoSQL)
Backend: Python

📦 1. Install Firebase SDK in Your React Project
Open VS Code terminal:

bash
npm install firebase

📁 2. Firebase Configuration (firebase.js in src/)
js
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // from Firebase Console
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
🔐 Get your Firebase config from:
Go to https://console.firebase.google.com → Create Project → Firestore Database → Web App.

🧠 3. Example: Save Mood Check-in to Firestore
Add this function in MannSurakshaApp.js:

js
import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const saveMoodCheck = async (mood, textInput) => {
  try {
    await addDoc(collection(db, 'moodCheckins'), {
      mood,
      text: textInput,
      createdAt: Timestamp.now()
    });
    console.log('Mood check-in saved!');
  } catch (e) {
    console.error('Error saving mood:', e);
  }
};
Then call it like this after setMood() in handleSubmitMood:

js
setMood(detectedMood);
saveMoodCheck(detectedMood, textInput);

📓 4. Example: Save Journal Entry
js
await addDoc(collection(db, 'journals'), {
  text: journal,
  createdAt: Timestamp.now()
});
