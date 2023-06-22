import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

export const firebaseConfig = {
    apiKey: "AIzaSyBth8_DY82XeSPFsQpIe7o7nlMhB9cwhxw",
    authDomain: "test-4a700.firebaseapp.com",
    databaseURL: "https://test-4a700-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-4a700",
    storageBucket: "test-4a700.appspot.com",
    messagingSenderId: "584338503905",
    appId: "1:584338503905:web:0c203821d4f7c436a75fa0",
    measurementId: "G-XNVTHV8FRE"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
