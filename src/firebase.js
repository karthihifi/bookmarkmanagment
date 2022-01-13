import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQus8I_wh_gyOztO4OzWznU5me0N8AMAw",
  authDomain: "bookmarkmanagement.firebaseapp.com",
  projectId: "bookmarkmanagement",
  storageBucket: "bookmarkmanagement.appspot.com",
  messagingSenderId: "520394667831",
  appId: "1:520394667831:web:bedf38440055db2c08ccb2",
  measurementId: "G-PYEKX0E2J8",
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth() //app.auth();
//const db = app.firestore();
const googleProvider = new GoogleAuthProvider();

// const signInWithGoogle = async () => {
//   try {
//     const res = await auth.signInWithPopup(googleProvider);
//     const user = res.user;
//     const query = await db
//       .collection("users")
//       .where("uid", "==", user.uid)
//       .get();
//     if (query.docs.length === 0) {
//       await db.collection("users").add({
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// signInWithPopup(auth, auth)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });


// const signInWithEmailAndPassword1 = 
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

// // async (email, password) => {
// //   try {
// //     await auth.signInWithEmailAndPassword(email, password);
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //   }
// // };
// // const registerWithEmailAndPassword = async (name, email, password) => {
// //   try {
// //     const res = await auth.createUserWithEmailAndPassword(email, password);
// //     const user = res.user;
// //     await db.collection("users").add({
// //       uid: user.uid,
// //       name,
// //       authProvider: "local",
// //       email,
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //   }
// // };
// const sendPasswordResetEmail = async (email) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const logout = () => {
//   auth.signOut();
// };
export {
    app,
//   auth,
//   signInWithPopup,
//   //db,
//   //signInWithGoogle,
//   signInWithEmailAndPassword,
//   //registerWithEmailAndPassword,
//   sendPasswordResetEmail,
//   logout,
};
