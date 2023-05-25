import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBoBr-VjUf2HJrjGvVIFthxwvjJKisQk3Y",
  authDomain: "bambudo-935b5.firebaseapp.com",
  projectId: "bambudo-935b5",
  storageBucket: "bambudo-935b5.appspot.com",
  messagingSenderId: "452734197771",
  appId: "1:452734197771:web:b19f080eb659d1b2a4670e"
};

firebase.initializeApp(firebaseConfig);
export default firebase;