import logo from './logo.svg';
import './App.css';
import app from './firebase.init';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react';
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  const handleGithubSignIn = () =>{
    signInWithPopup(auth,githubProvider)
    .then(result =>{
      const user  = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error =>{
      console.error(error);
    } )
  }

  const handleFacebookSignIn =() =>{
     signInWithPopup (auth,facebookProvider)
     .then(result =>{
       const user = result.user;
       setUser(user);
       console.log(user);

     })
     .catch(error =>{
       console.error(error);
     })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        setUser({});
      })
  }

  return (
    <div className="App">

      {
        user.uid ? <button onClick={handleSignOut}>sign Out</button> :
          <div>
            <button onClick={handleGoogleSignIn}>Google SignIn</button>
            <button onClick={handleFacebookSignIn}>Facebook SignIn</button>
            <button onClick={handleGithubSignIn}>Github sign In </button>
          </div>
      }
      <h2> NAME :{user.displayName}</h2>
      <p>Your Email : {user.email}</p>
      <img src={user.photoURL} alt="" />

    </div>
  );
}

export default App;
