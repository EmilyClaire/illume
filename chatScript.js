window.onload = function(){

var chatRef = firebase.database().ref('chat');
var rootRef = firebase.database().ref();
var textInput = document.querySelector('#text');
var demoInput = document.querySelector('#demo');
var postButton = document.querySelector('#post');

      // ADD THESE 4 LINES
    var username = null;
    var loginButton = document.querySelector('#login');
    postButton.style.display = "none";
    textInput.style.display = "none";
    demoInput.style.display = "block";
    var user = null;


   postButton.addEventListener("click", function() {
       var msgUser = username;
       var msgText = textInput.value;


        rootRef.push({username:msgUser, text:msgText});
      textInput.value = "";
    });

     /** Function to add a data listener **/
    var startListening = function() {
       rootRef.on('child_added', function(snapshot) {
        var msg = snapshot.val();
  var msgUsernameElement = document.createElement("b");
        msgUsernameElement.textContent = msg.username;
        
        msgUsernameElement.className = "userNameText";
        
        var msgTextElement = document.createElement("p");
        msgTextElement.textContent = msg.text;
        
        var msgElement = document.createElement("div");
        msgElement.appendChild(msgUsernameElement);
        msgElement.appendChild(msgTextElement);

          // ADD THIS LINE
        msgElement.className = "msg";
        document.getElementById("results").appendChild(msgElement);
      });
    }
    
loginButton.addEventListener("click", function() {
          var auth = firebase.auth();

          var provider = new firebase.auth.GoogleAuthProvider();
          auth.signInWithPopup(provider).then(function(result) {
        // User signed in!
        username = result.user.uid;
       var demoText = demoInput.value;
        user = chatRef.child(username);
        var newUserRef = user.push();
         newUserRef.set({
         name: username,
         demographics: demoText
             });

        loginButton.textContent = "Logged in as " + username;
        loginButton.disabled = true;
        postButton.style.display = "block";
        textInput.style.display = "block";
        demoInput.style.display = "none";
        // Start listening for data, remove previous calls to this method
        startListening();

          }).catch(function(error) {
    // An error occurred
          });
    });           
};