window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

const secureEmail = `eG51dmVyc2gxa2FyNEBnbWFpbC5jb20=`;

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const decodedEmail = atob(secureEmail);
    const mailtoLink = `mailto:${decodedEmail}?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent('Email: ' + email + '\n\nMessage: ' + message)}`;

    window.location.href = mailtoLink;
});
