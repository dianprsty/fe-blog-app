import { initializeApp } from "../../node_modules/firebase/app";
import { getFirestore } from "../../node_modules/firebase/firestore";
import { getAuth } from "../../node_modules/firebase/auth";

const envVar = import.meta.env;

const firebaseConfig = {
  apiKey: envVar.VITE_API_KEY,
  authDomain: envVar.VITE_AUTH_DOMAIN,
  projectId: envVar.VITE_PROJECT_ID,
  storageBucket: envVar.VITE_STORAGE_BUCKET,
  messagingSenderId: envVar.VITE_MESSAGING_SENDER_ID,
  appId: envVar.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
