emailjs.init('oI9cSzYQi-CbJD0OE');

window.onload = function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('service_o0joyin', 'template_3pgmocg', this)
            .then(function() {
                    console.log('SUCCESS!');
                }, function(error) {
                    console.log('FAILED...', error);
                });
    });
}

function createOption(value, text) {
    var option = document.createElement('option');
    option.text = text;
    option.value = value;
    return option;
}

var hourSelect = document.getElementById('hours');
for(var i = 1; i <= 12; i++){
    hourSelect.add(createOption(i, i));
}

var minutesSelect = document.getElementById('minutes');
minutesSelect.add(createOption(0, "00"));
minutesSelect.add(createOption(30, "30"));
