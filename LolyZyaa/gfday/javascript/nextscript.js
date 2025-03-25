document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.button');
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#ff66cc';
        button.style.color = 'white';
    });

    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    });

    const audio = document.getElementById('background-audio');
    const audioCurrentTime = localStorage.getItem('audioCurrentTime');
    if (audioCurrentTime) {
        audio.currentTime = audioCurrentTime;
    } else {
        audio.play();
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
    
        const colors = ['red', 'blue', 'purple', 'green', 'pink', 'orange', 'yellow'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        heart.style.backgroundColor = randomColor;
        heart.style.borderColor = randomColor;
    
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `-${Math.random() * 20 + 10}vh`;
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    
        const style = document.createElement('style');
        style.innerHTML = `
            .heart::before, .heart::after {
                background-color: ${randomColor};
            }
        `;
        document.head.appendChild(style);
    
        document.getElementById('hearts-container').appendChild(heart);
    
        setTimeout(() => {
            heart.remove();
            style.remove();
        }, 5000);
    }
    
    setInterval(createHeart, 100);
    

    const encodedUrl = "aHR0cHM6Ly9hcGkud2hhdHNhcHAuY29tL3NlbmQ/cGhvbmU9NjI4Nzg4Njg5MzE1MSZ0ZXh0PVRlcmltYWthc2loJTIwc2F5YW5nZyUyMHVkYWglMjBidWF0aW4lMjB1bnR1ayUyMGFrdeKdpA==";
    const whatsappLink = document.getElementById('whatsapp-link');
    whatsappLink.addEventListener('click', (event) => {
        event.preventDefault();
        const decodedUrl = atob(encodedUrl);
        window.location.href = decodedUrl;
    });

    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(element, text, i), 50);
        } else {
            element.innerHTML += '<br>';
        }
    }

    function startTyping(element) {
        const text = element.getAttribute('data-text');
        element.style.visibility = 'visible'; // Make the element visible when it's being typed
        typeWriter(element, text);
    }

    // Intersection Observer for starting typewriter effect
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTyping(entry.target);
                observer.unobserve(entry.target); // Stop observing after starting typing
            }
        });
    }, { threshold: 0.1 }); // Adjust the threshold as needed

    document.querySelectorAll('.typewriter').forEach(element => {
        observer.observe(element);
    });
});
