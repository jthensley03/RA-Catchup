emailjs.init('oI9cSzYQi-CbJD0OE');

window.onload = function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        if(validateContactForm()) {
            event.preventDefault();
            emailjs.sendForm('service_o0joyin', 'template_3pgmocg', this)
                .then(function() {
                        console.log('SUCCESS!');
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
        }
    });
}
