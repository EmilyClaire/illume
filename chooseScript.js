window.onload = function() {
    var user = firebase.auth().currentUser;
    var demographic = null;
    var companion = null;
    var userName = null;
    
    if (user) {
        userName = user.uid;
        var query = firebase.database().ref("chat").orderByKey();
        query.once("child_added")
        .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
            console.log(user);
      var key = childSnapshot.key;
        var childData = childSnapshot.val();
            console.log("name - " + childData["name"]);
            if(childData["name"] !== userName){
                companion = childData["name"];
                console.log(childData);
                demographic = childData["demographics"];
		console.log(companion);

		var companionName = document.getElementById("companion");
		companionName.textContent = companion;
                
        var companionDesc = document.getElementById("person2").getElementsByClassName("desc")[0];
        companionDesc.textContent = demographic;    
            }
  });
});
    
    }
    else {
	console.log("No one logged in");        
    }
}
