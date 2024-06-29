document.addEventListener("DOMContentLoaded", function() {
    var encodedEmail = 'ZW1haWxrYW11QGdtYWlsLmNvbQ=='; // email@domain.com
    var encodedWhatsApp = 'NjI4MTIzNDU2Nzg5'; // +62 812-3456-7890
    var encodedTelegram = 'QFVzZXJuYW1lVGVsZWdyYW1LYW11'; // @username

    var decodeBase64 = function (str) {
        return atob(str);
    };

    document.getElementById('contactEmail').value = decodeBase64(encodedEmail);
    document.getElementById('contactEmail').href = 'mailto:' + decodeBase64(encodedEmail);

    document.getElementById('contactWhatsApp').value = decodeBase64(encodedWhatsApp);
    document.getElementById('contactWhatsApp').href = 'https://wa.me/' + decodeBase64(encodedWhatsApp).replace(/^\+/, '');

    document.getElementById('contactTelegram').value = decodeBase64(encodedTelegram);
    document.getElementById('contactTelegram').href = 'https://t.me/' + decodeBase64(encodedTelegram).replace(/^\@/, '');

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;
        var contactMethod = document.getElementById('contactMethod').value;

        var subject = 'Pesan dari ' + name;
        var body = message + '\nEmail: ' + email;

        var link;

        switch(contactMethod) {
            case 'email':
                // https://mail.google.com/mail/?view=cm&fs=1&to=
                // bisa gunakan mailto:
                link = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + decodeBase64(encodedEmail) + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
                break;
            case 'whatsapp':
                link = 'https://wa.me/' + decodeBase64(encodedWhatsApp).replace(/^\+/, '') + '?text=' + encodeURIComponent('Pesan dari ' + name + '\nEmail: ' + email + '\nPesan: ' + message);
                break;
            // case 'telegram':
            //     link = 'https://t.me/' + decodeBase64(encodedTelegram) + '?start=' + encodeURIComponent('Pesan dari ' + name + '\nEmail:' + email + '\nPesan' + message);
            //     break;
        }

        window.open(link, '_blank');

        Swal.fire({
            icon: 'success',
            title: 'Pesan Terkirim',
            text: 'Pesan Anda telah berhasil dikirim!',
            confirmButtonText: 'OK'
        });
    });
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    Swal.fire({
        title: 'Oops! Maaf',
        text: 'Klik kanan tidak diperbolehkan.',
        icon: 'error'
    });
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 'f12' || e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === "I"))) {
        e.preventDefault();
        Swal.fire({
            title: 'Oops!',
            text: 'Shortcut ini tidak diperbolehkan.',
            icon: 'error'
        });
    }
});

const modeSwitcher = document.getElementById('modeSwitcher');
const body = document.body;
modeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    modeSwitcher.textContent = body.classList.contains('dark-mode') ? 'Mode Terang' : 'Mode Gelap';

    const faqAnswers = document.querySelectorAll('.faq-answer');
    faqAnswers.forEach(answer => {
        if (body.classList.contains('dark-mode')) {
            answer.style.color = '#000';
        } else {
            answer.style.color = '';
        }
    });

    const waktu1 = document.querySelectorAll('.waktu');
    waktu1.forEach(answer => {
        if (body.classList.contains('dark-mode')) {
            answer.style.color = '#fff';
        } else {
            answer.style.color = '';
        }
    });
});

document.addEventListener("DOMContentLoaded", (event) => {
  setTimeout(function () {
    Swal.fire({
      title: 'Selamat Datang!',
      text: 'Selamat Datang! di website Pariwisata Indonesia. Kami memberikan pelayanan terbaik dan terpercaya untuk Anda. Kami akan selalu siap menjelajahi keindahan dan kekayaan budaya Indonesia.',
      icon: 'info',
      timer: 3500,
      showConfirmButton: false,
      willClose: () => {
        console.log('ditutup');
      }
    });
  }, 0);
});

const waktu = document.getElementById('waktu');
setInterval(() => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const language = navigator.language || 'id-ID';
    const formattedDate = now.toLocaleDateString(language.startsWith('en') ? 'en-US' : 'id-ID', options);
    waktu.textContent = formattedDate;
}, 1000);
