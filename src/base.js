import rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: '',
    authDomain: '',
    databaseURL: '',
});

const base = rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
