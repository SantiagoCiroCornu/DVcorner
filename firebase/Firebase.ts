// firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Config de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB8a7yir7rMiNyZgSvllJx3ZU_ybBHGeKQ",
  authDomain: "dvcorner-3eda2.firebaseapp.com",
  projectId: "dvcorner-3eda2",
  storageBucket: "dvcorner-3eda2.appspot.com",
  messagingSenderId: "881678766557",
  appId: "1:881678766557:web:946fafc32d32e1fa812634",
};

// Verifica si Firebase ya fue inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : undefined;

// Inicializar Firestore
const db = getFirestore();

// Inicializar Auth con persistencia solo si no está inicializado
let auth;
try {
  auth = initializeAuth(app!, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  auth = getAuth(); // Ya está inicializado
}

export { auth, db };
