import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../configs/firebase.config";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth;

export const updateProfile = (displayName, photoURL) => {
    const user = auth().currentUser;
    let profile = { displayName };
    if (photoURL) {
        profile.photoURL = photoURL;
    }

    return user.updateProfile(profile)
    .then(() => true)
    .catch(()=> false);
};

export const setUser = (user, name) => {
    const {email, displayName, photoURL, emailVerified} = user;
    const newUser = {
        email,
        name: displayName || name,
        photo: photoURL,
        emailVerified
    };
    return newUser;
};

export const getToken = () => {
    return auth().currentUser.getIdToken(true)
    .then(idToken => idToken)
    .catch(err => false);
};

export const createUser = (email, password, name) => {
    return auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        updateProfile(name);
        return setUser(res.user, name);
    })
    .catch(err => err.message);
};

export const signingUser = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password)
    .then(res => setUser(res.user))
    .catch(err => err.message);
};

export const googleSignIn = ()=> {
    const provider = new auth.GoogleAuthProvider();

    return auth()
    .signInWithPopup(provider)
    .then(res => setUser(res.user))
    .catch(err => err.message);
};

export const fbSignIn = () => {
    const provider = new auth.FacebookAuthProvider();
    
    return auth()
    .signInWithPopup(provider)
    .then(res => setUser(res.user))
    .catch(err => err.message);
};

export const userSignOut = () => {
    return auth()
    .signOut()
    .then(() => true)
    .catch(err => false);
};

export const sendEmailVerification = path => {
    const user = auth().currentUser;
    const actionCodeSettings = {
        url: `${window.location.origin}${path}`
    }

    return user.sendEmailVerification(actionCodeSettings)
    .then(() => true)
    .catch(err => false);
}

export const deleteUser = ()=> {
    const user = auth().currentUser;

    return user.delete()
    .then(() => true)
    .catch((err) => false);
}