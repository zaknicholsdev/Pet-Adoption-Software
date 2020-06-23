import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQdcjPH_x-rvpmtSo-d9HM47R9ny1hfBg",
    authDomain: "pet-adoption-647e7.firebaseapp.com",
    databaseURL: "https://pet-adoption-647e7.firebaseio.com",
    projectId: "pet-adoption-647e7",
    storageBucket: "pet-adoption-647e7.appspot.com",
    messagingSenderId: "1046722928807",
    appId: "1:1046722928807:web:25a89cb142aa9a6e027b82"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase