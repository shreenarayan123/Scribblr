
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC3SSC_U88FC9KPqFSKzquc5Whbxxmogzc",
  authDomain: "blogging-web-66677.firebaseapp.com",
  projectId: "blogging-web-66677",
  storageBucket: "blogging-web-66677.appspot.com",
  messagingSenderId: "791321427077",
  appId: "1:791321427077:web:0269d858aef2243417fdec",
  measurementId: "G-TLM3WVYZ8X"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);