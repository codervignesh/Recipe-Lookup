import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import cover2 from '../Assets/cover7.jpg'
import mobCover2 from '../Assets/mob-login.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav } from 'react-bootstrap';
import 'dotenv'

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DBURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STRGBKT,
    messagingSenderId: process.env.REACT_APP_MSGSNDR,
    appId: process.env.REACT_APP_APPID
};
firebase.initializeApp(config);

class FusionAccount extends React.Component {
  state = {
    isSignedIn: false
  };
 
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
 
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      try{
        const db = firebase.firestore()
        db.collection('Users').doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
          if(snapshot.data() === undefined){
            db.collection('Users').doc(firebase.auth().currentUser.uid).set({
              uid: firebase.auth().currentUser.uid
            })
          }
        })
      }
      catch(e){}
      this.setState({isSignedIn: !!user})
  })
  }
  
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
 
  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
            <div>
              <div className='theCover'>
              <img src={cover2} className='coverImg dsktp-img' alt='cover2'></img>
              <img src={mobCover2} className='coverImg mobile-img' alt='cover2'></img>
                <div className="carousel-caption p-5 mb-6">
                    <div style={{width: 'calc(100% + 80px)',marginLeft:'-30px'}}>
                      <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                    </div>
                    <br/>
                    <br/>
                    <div className='login-dsktp'>
                      <h1 className="fnt med text-center caption-head">Login To Your Recipe Lookup Account<br/></h1>
                      <p className="fnt med text-center sub-sub">To Save your Favourite Recipe<br/><br/></p>
                    </div>
                </div>
                <div className='login-mob'>
                  <h1 className="fnt text-center caption-head">Login To Your Recipe Lookup Account<br/></h1>
                  <p className="fnt text-center sub-sub">To Save your Favourite Recipe<br/><br/></p>
                </div>
              </div>
            </div>
        </div>
      );
    }
    return (
      <div className="my-auto">
          <div className='theCover'>
            <img src={cover2} className='coverImg dsktp-img' alt='cover2'></img>
            <img src={mobCover2} className='coverImg mobile-img' alt='cover2'></img>
            <div className='login-dsktp'>
              <div style={{position: 'fixed',transform: 'translate(-50%,-50%)',top: '50%',left: '50%'}}>
                <h1 className="fnt text-center caption-head">Welcome Back, {firebase.auth().currentUser.displayName}<br/></h1>
                <p className="fnt text-center sub-sub">You're Now Signed In<br/><br/></p>
              </div>
              <Nav.Link className='d-flex justify-content-center' onClick={() =>
                firebase.auth().signOut().then(() =>{
                  window.location.reload()
                })
              }>Sign-out</Nav.Link>
            </div>
            
            <div className='login-mob'>
              <h1 className="fnt text-center caption-head">Welcome Back, {firebase.auth().currentUser.displayName}<br/></h1>
              <p className="fnt text-center sub-sub">You're Now Signed In<br/><br/></p>
              <Nav.Link className='d-flex justify-content-center' onClick={() =>
                firebase.auth().signOut().then(() =>{
                  window.location.reload()
                })
              }>Sign-out</Nav.Link>
            </div>
          </div>
      </div>
    );
  }
}

export default FusionAccount