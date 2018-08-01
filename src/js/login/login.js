/* global firebase */
window.sesionGoogle = (callback, callbackError) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');
  firebase.auth().signInWithPopup(provider)
    .then(() => {    
      callback();
    })
    .catch((error) => {
      callbackError(error);
    });
};
window.sesionFacebook = (callback, callbackError) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      callback();
    })
    .catch((error) => {
      callbackError(error);
    });
};

window.registerUser = (emailVal, rpasswordVal, nameUs, callbackError) => {
  firebase.auth().createUserWithEmailAndPassword(emailVal, rpasswordVal)
    .then((user) => {    
      user.user.updateProfile({ 
        'displayName': nameUs,
        'photoURL': 'https://image.flaticon.com/icons/svg/1034/1034680.svg', 
      });
    })
    .catch((error) => {
      callbackError(error);
    });
};

window.loginUser = (emailVal, passwordVal, callback, callbackError) => {
  firebase.auth().signInWithEmailAndPassword(emailVal, passwordVal)
    .then(() => {
      callback();
    })
    .catch((error) => {
      callbackError(error);
    });
};