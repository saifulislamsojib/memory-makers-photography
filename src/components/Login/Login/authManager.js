import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../configs/firebase.config";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const setUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: name
    }).then(() => {

    }).catch(err => {

    });
};

export const updateProfile = (name, photo) => {
    const user = firebase.auth().currentUser;

    return user.updateProfile({
    displayName: name,
    photoURL: photo
    })
    .then(() => {
        return true;
    })
};

const setUser = (res, name) => {
    const {email, displayName, photoURL, emailVerified} = res.user;
    const newUser = {
        email,
        name: displayName || name,
        photo: photoURL,
        emailVerified
    };
    return newUser;
};

export const getToken = () => {
    return firebase.auth().currentUser.getIdToken(true)
    .then(idToken => {
        return idToken;
    })
    .catch(err => {
        console.log(err);
    });
};

export const createUser = (email, password, name) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        setUserName(name);
        return setUser(res, name);
    })
    .catch(err => {
        return err.message;
    });
};

export const signingUser = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        return setUser(res);
    })
    .catch(err => {
        return err.message;
    });
};

export const googleSignIn = ()=> {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
        return setUser(res);
    })
    .catch(err => {
        return err.message;
    });
};

export const fbSignIn = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    
    return firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
        return setUser(res);
    })
    .catch(err => {
        return err.message;
    });
};

export const userSignOut = () => {
    return firebase.auth()
    .signOut()
    .then(() => {

    })
    .catch((err) => {
        console.log(err.message);
    });
};

export const auth = () => {
    return firebase.auth();
};

export const sendEmailVerification = path => {
    const user = firebase.auth().currentUser;
    const actionCodeSettings = {
        url: `${window.location.origin}${path}`
    }

    return user.sendEmailVerification(actionCodeSettings)
    .then(() => {
        return true;
    })
    .catch(err => {
        return false;
    });
}