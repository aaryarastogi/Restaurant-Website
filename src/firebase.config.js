import {getApp , getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB8BzRdh5c5fuG7GVI6hX3oWguCkIZnmok",
    authDomain: "restaurantapp-8c9cf.firebaseapp.com",
    databaseURL: "https://restaurantapp-8c9cf-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-8c9cf",
    storageBucket: "restaurantapp-8c9cf.appspot.com",
    messagingSenderId: "80294713323",
    appId: "1:80294713323:web:53ea27892cb29cf7842bae"
  };

const app= getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore= getFirestore(app)
const storage = getStorage(app)

export {app , firestore , storage};