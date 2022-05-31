import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyDvPRlT6OV5eA0HvcoY45u9DAXhUYPem1A",
  authDomain: "mytype-8123d.firebaseapp.com",
  projectId: "mytype-8123d",
  storageBucket: "mytype-8123d.appspot.com",
  messagingSenderId: "991764435907",
  appId: "1:991764435907:web:faeb138b8e905a29906376",
  measurementId: "G-ETDJ82HYZZ"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };