import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyC3MaT5wlZunr3dsTiA_juZIgCxGa_zqnM",
	authDomain: "streax-40b8d.firebaseapp.com",
	projectId: "streax-40b8d",
	storageBucket: "streax-40b8d.appspot.com",
	messagingSenderId: "328282332120",
	appId: "1:328282332120:web:fd64be4d6e16fea1c670ad",
	measurementId: "G-P7YC1VNR63"
};


if( firebase.apps.length === 0 ){
	firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()

export {firebase}

