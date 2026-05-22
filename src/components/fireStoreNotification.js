// import firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyADEkYX03HB3HdR2QzkLBDEaDj0n61EheQ",
  authDomain: "web-notifications-adae0.firebaseapp.com",
  projectId: "web-notifications-adae0",
  storageBucket: "web-notifications-adae0.appspot.com",
  messagingSenderId: "565473615037",
  appId: "1:565473615037:web:1ebcce1c909bc1c85d2bd4",
  measurementId: "G-DNXRD41BBZ"
}
const FirestoreServiceConfig = firebase.initializeApp(config, "web_notifications");
export default FirestoreServiceConfig.firestore();