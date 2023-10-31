// Firebase

const firebaseConfig = {
  apiKey: "AIzaSyAOIEVXT9gVjVCxfAZdhEY9IOiEgshaxqg",
  authDomain: "ra-catchup.firebaseapp.com",
  projectId: "ra-catchup",
  storageBucket: "ra-catchup.appspot.com",
  messagingSenderId: "173324803962",
  appId: "1:173324803962:web:6f816f19670f921c06c0c3",
  measurementId: "G-YN475PRNEP"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

function createOption(value, text) {
    var option = document.createElement('option');
    option.text = text;
    option.value = value;
    return option;
}

var timeSelect = document.getElementById('time');

function removeOptions(selectElement) {
   var i, L = selectElement.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectElement.remove(i);
   }
}

document.getElementById('user_date').addEventListener('change', (event) => {
    const edate = document.getElementById('user_date').value;
    let edateArr = edate.split("-");
    let month = edateArr[1];
    let day = edateArr[2];
    removeOptions(timeSelect);
    firebase.database().ref(month + "/" + day).once('value', snapshot => {
        console.log("snapshot" + snapshot);
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot.key);
            timeSelect.add(createOption(childSnapshot.key, childSnapshot.key));
        });
    });
});

function removeSlot(e) {
    const edate = document.getElementById('user_date').value;
    let time = document.getElementById('time').value;
    console.log(time);
    let edateArr = edate.split("-");
    let month = edateArr[1];
    let day = edateArr[2];
    firebase.database().ref(month + "/" + day + "/" + time).remove();
}

// emailJS
emailjs.init('oI9cSzYQi-CbJD0OE');

window.onload = function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('service_o0joyin', 'template_zqsknev', this)
            .then(function() {
                    console.log('SUCCESS!');
                    removeSlot();
                    document.body.innerHTML = "<p class='submit-text'>Thank you!</p>";
                }, function(error) {
                    console.log('FAILED...', error);
                    document.body.innerHTML = "<p class='submit-text'>Something went wrong, try again or contact Jason</p>";
                });
    });
}
