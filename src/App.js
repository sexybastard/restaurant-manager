import React, { Component } from 'react';
import './App.css';
import HomeContainer from './HomeContainer.js';
import Login from './Login.js';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyB9G_v0FY2aFN3VzG9J10TI_wtSc-hEFBg",
  authDomain: "interview-test-ec9c0.firebaseapp.com",
  databaseURL: "https://interview-test-ec9c0.firebaseio.com",
  projectId: "interview-test-ec9c0",
  storageBucket: "interview-test-ec9c0.appspot.com",
  messagingSenderId: "493975126354"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

var realtimeDb = firebase.database();

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      loggedIn: false
    };
  }

  handleLogin = (email) => {
    this.setState({email})
    let userRef = db.collection('users').doc(email);
    userRef.get().then(resp => {
      if(!resp.exists){
        userRef.set({email}).then(ref => {
          this.setState({loggedIn: true}, () => alert('New user has been created: ' + email))
          this.props.setLoggedinUser(email);
        });
      }
      else{
        this.setState({loggedIn: true}, () => alert('Logged in as: ' + email))
        this.props.setLoggedinUser(email);
      }
    }).catch(err => {
      alert('Connection error! unable to access firebase. Please check your internet connection')
      console.log('Error getting document', err);
    });
  }

  render() {
    const {email} = this.state;
    return (
      <div className="App">
        {
          this.state.loggedIn ? (email ? <HomeContainer db={db} realtimeDb={realtimeDb} user={email} /> : null) : <Login db={db} handleLogin={this.handleLogin} />
        }
      </div>
    );
  }
}

export default App;
