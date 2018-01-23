import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

  firebaseInstance;

  constructor() { 
    this.initializeFirebase();
  }

  initializeFirebase() {
    let config = {
      apiKey: "AIzaSyA3A60PNVTjLDhXNpVKDhjntcp7KSsWAp4",
      authDomain: "forum-app-challenge.firebaseapp.com",
      databaseURL: "https://forum-app-challenge.firebaseio.com",
      storageBucket: "forum-app-challenge.appspot.com",
      messagingSenderId: "937135036055"
    };

    this.firebaseInstance = firebase;
    this.firebaseInstance.initializeApp(config);
  }

  authenticateWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return this.firebaseInstance.auth().signInWithPopup(provider);
  }
}
