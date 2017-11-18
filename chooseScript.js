window.onload = function() {
    var user = firebase.auth().currentUser;
    var demographic = null;
    var companion = null;
    var userName = null;
    
    if (user) {
        userName = user.G;
        var query = firebase.database().ref("chat").orderByKey();
        query.once("value")
        .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
        var childData = childSnapshot.val();
    
            if(childData.username !== userName){
                companion = childData.username;
                demographic = childData.demographics;
            }
  });
});
    
    console.log(companion + " " + demographic);
    }
    else {
        
    }
}