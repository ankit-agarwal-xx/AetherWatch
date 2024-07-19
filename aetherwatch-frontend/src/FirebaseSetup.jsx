import { initializeApp } from "firebase/app";
import  {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDDZNpHxBx-JJQEzxIPHSXaMcq4aASN6yM",
  authDomain: "aetherwatch-fde03.firebaseapp.com",
  databaseURL: "https://aetherwatch-fde03-default-rtdb.firebaseio.com",
  projectId: "aetherwatch-fde03",
  storageBucket: "aetherwatch-fde03.appspot.com",
  messagingSenderId: "674693600514",
  appId: "1:674693600514:web:202921b1247caa3ddd9e1b",
  measurementId: "G-5YWXSBZKXD"
};

initializeApp(firebaseConfig);
export const auth = getAuth();