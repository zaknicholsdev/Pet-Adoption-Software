import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCuNHsDqXsHpQr3n6QHiYB4beGKJDJQnD0",
    authDomain: "my-project-b092f.firebaseapp.com",
    databaseURL: "https://my-project-b092f.firebaseio.com",
    projectId: "my-project-b092f",
    storageBucket: "my-project-b092f.appspot.com",
    messagingSenderId: "772498877197",
    appId: "1:772498877197:web:2d4fbcef09f4d2e0"
}

firebase.initializeApp(firebaseConfig)

export default firebase