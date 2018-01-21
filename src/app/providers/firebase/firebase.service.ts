import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

  constructor() { 
  }

  initializeFirebase() {
    let config = {
      apiKey: "AIzaSyA3A60PNVTjLDhXNpVKDhjntcp7KSsWAp4",
      authDomain: "forum-app-challenge.firebaseapp.com",
      databaseURL: "https://forum-app-challenge.firebaseio.com",
      storageBucket: "forum-app-challenge.appspot.com",
      messagingSenderId: "937135036055"
    };

    firebase.initializeApp(config);
    return firebase;
  }

  authenticate() {
    let firebaseInstance = this.initializeFirebase();
    let provider = new firebase.auth.GoogleAuthProvider();

    return firebaseInstance.auth().signInWithPopup(provider);
  }
}
