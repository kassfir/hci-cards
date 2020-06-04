//(function (){
//    const firebaseConfig = {
//      apiKey: "AIzaSyBfRVtURLNcozaeLnXOEKBZyPtmfm6-rYM",
//      authDomain: "hci-test-c5e25.firebaseapp.com",
//      databaseURL: "https://hci-test-c5e25.firebaseio.com",
//      projectId: "hci-test-c5e25",
//      storageBucket: "hci-test-c5e25.appspot.com",
//      messagingSenderId: "258429231641",
//      appId: "1:258429231641:web:05206511b605b96a184088"
//    };
//
//}  )();

firebase.auth().signInAnonymously().catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;

  } else {
//    window.alert('I couldn\'t create a user token for you. That means I can\'t register' +
//    'your test results. Perhaps, your cookies are disabled.\n\nYou can still play the game ' +
//    'if you want to procrastinate until your inevitable demise.');

  }
});

document.getElementById("game-logic").onload = function() {
  if (!user){
    blockDB = true;
  } else {
    blockDB = false;
  }
};

function uploadToDatabase(font, taskNum, time, answerCount, correct, wrong){
  user = firebase.auth().currentUser;

  firebase.database().ref(user.uid+"/"+font+taskNum).update({
      time: time,
      answerCount: answerCount,
      correct: correct,
      wrong: wrong
  });
}


