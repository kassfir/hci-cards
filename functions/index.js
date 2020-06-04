//creates database instance

(function (){
    const firebaseConfig = {
      apiKey: "AIzaSyBfRVtURLNcozaeLnXOEKBZyPtmfm6-rYM",
      authDomain: "hci-test-c5e25.firebaseapp.com",
      databaseURL: "https://hci-test-c5e25.firebaseio.com",
      projectId: "hci-test-c5e25",
      storageBucket: "hci-test-c5e25.appspot.com",
      messagingSenderId: "258429231641",
      appId: "1:258429231641:web:05206511b605b96a184088"
    };

}  )();
//
// firebase.auth().signInAnonymously().catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });
//
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//
//   } else {
//     window.alert('I couldn\'t create a user token for you. That means I can\'t register' +
//     'your test results. Perhaps, your cookies are disabled.\n\nYou can still play the game ' +
//     'if you want to procrastinate until your inevitable demise.');
//
//   }
//   // ...
// });
//
// document.getElementById("game-logic").onload = function() {
//   if (!user){
//     blockDB = true;
//   } else {
//     blockDB = false;
//   }
// };
//
//   //if user has done this, does not register.
// // function checkDB() {
// //   user = firebase.auth().currentUser;
// //   if (user) {
// //     // User is signed in.
// //     var database = firebase.database();
// //
// //     var returning = database.ref('posts/' + postId + '/starCount');
// //     starCountRef.on('value', function(snapshot) {
// //       updateStarCount(postElement, snapshot.val());
// //     });
// //
// //
// //   } else {
// //     return true;
// //   }
// //   // ...
// // });
//
// function uploadToDatabase(font, taskNum, time, answerCount, correct, wrong){
//   user = firebase.auth().currentUser;
//
//   firebase.database().ref(user.uid+"/"+font+taskNum).update({
//       time: time,
//       answerCount: answerCount,
//       correct: correct,
//       wrong: wrong
//   });
// }
//
// /*
// //creates object
// function writeData(){//userId, name, email, imageUrl) {
//   uid = request.auth.uid;
//   firebase.database().ref(uid).set({
//     ident: uid
//   });
// }
//
// //appends the object with a sub-object
// function appendData(task){
//   uid = request.auth.uid;
//   firebase.database().ref(uid+"/"+tasks).update({
//       task: task
//   });
// }
// */
