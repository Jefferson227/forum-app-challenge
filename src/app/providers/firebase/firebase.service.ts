import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class FirebaseService {

  firebaseInstance;
  firebaseAuth;
  databaseRef;

  constructor(private _router: Router) {
    this.initializeFirebase();
  }

  initializeFirebase() {
    // Configuration parameters
    let config = {
      apiKey: "AIzaSyA3A60PNVTjLDhXNpVKDhjntcp7KSsWAp4",
      authDomain: "forum-app-challenge.firebaseapp.com",
      databaseURL: "https://forum-app-challenge.firebaseio.com",
      storageBucket: "forum-app-challenge.appspot.com",
      messagingSenderId: "937135036055"
    };

    // Initializing connection with firebase
    this.firebaseInstance = firebase;
    this.firebaseInstance.initializeApp(config);
    this.firebaseAuth = this.firebaseInstance.auth();
    this.databaseRef = this.firebaseInstance.database().ref();

    // Activating listener for user logged by email and password
    this.onAuthStateChanged();
  }

  authenticateWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return this.firebaseAuth.signInWithPopup(provider);
  }

  authenticateWithEmailAndPassword(email, password) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .catch(err => console.error(err));
  }

  onAuthStateChanged() {
    this.firebaseAuth
      .onAuthStateChanged(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this._router.navigate(['/']);
        }
      });
  }

  signOut() {
    localStorage.clear();
    this.firebaseAuth.signOut();
  }

  createNewDiscussion(discussionObj) {
    console.log('trying to create a discussion list');
    const discussionsRef = this.databaseRef.child('discussions');
    // const subdiscussionsRef = discussionsRef.orderByChild('name').equalTo('Jefferson');
    // console.log(subdiscussionsRef);

    // subdiscussionsRef.on('value', snap => {
    //   console.log(snap.val());
    // });

    // discussionsRef.on('value', snap => {
    //   debugger;
    //   console.log(snap.val());
    // });

    discussionsRef.push(discussionObj);
  }

  getAllDiscussions() {
    return this.databaseRef.child('discussions');
  }

  getDataFromDiscussion(discussionHash) {
    return this.firebaseInstance.database().ref(`/discussions/${discussionHash}`);
  }

  addCommentToADiscussion(discussionHash, commentObj) {
    const discussionRef = this.firebaseInstance.database().ref(`/discussions/${discussionHash}`);
    discussionRef.child('comments').push(commentObj);
  }

  deleteCommentToADiscussion(discussionHash) {
    const discussionRef = this.firebaseInstance.database().ref(`/discussions/${discussionHash}`);
    discussionRef.remove();
  }
}
