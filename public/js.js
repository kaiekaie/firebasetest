

firebase.auth().signInWithEmailAndPassword("test@example.com","Test1234").catch(function(error) {
    // Handle Errors here.
    console.log(error," lol")
    var errorCode = error.code;

    var errorMessage = error.message;
    // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
      // User is signed in.
      var ref = firebase.database().ref('Users/'+user.uid);
      console.log("lol test");
      console.log(ref);
      ref.on('value', function(snapshot) {
        console.log(snapshot.val())
      });

  
  
      // ...
    } else {
      // User is signed out.
      // ...
      console.log("not logged inn");
    }
  });

  


  var Users = firebase.database().ref('Users');

  Users.on('value', function(snapshot) {
    console.log(snapshot.val())
  });


  function writeUserData(userId, name, email, imageUrl) {

    firebase.database().ref('Users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

  writeUserData("poopy","asshole poo","asdas@poop.no","/img")