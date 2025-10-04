document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

let currentSlide = 1;
const totalSlides = 7;
let musicPlaying = false;
let audioContext = null;
let externalAudio = null;
let currentMusicType = null; // 'melody' or 'external'

function initializeWebsite() {
    createBackgroundAnimations();
    setupEventListeners();
    createMusicContext();
}

function createBackgroundAnimations() {
    const heartsContainer = document.getElementById('heartsContainer');
    setInterval(() => {
        if (heartsContainer.children.length < 15) {
            createHeart(heartsContainer);
        }
    }, 800);
    
    const bubblesContainer = document.getElementById('bubblesContainer');
    setInterval(() => {
        if (bubblesContainer.children.length < 20) {
            createBubble(bubblesContainer);
        }
    }, 600);
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = Math.random() > 0.5 ? '💜' : '💚';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

function createBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.width = (Math.random() * 40 + 20) + 'px';
    bubble.style.height = bubble.style.width;
    bubble.style.animationDuration = (Math.random() * 5 + 8) + 's';
    container.appendChild(bubble);
    
    setTimeout(() => {
        bubble.remove();
    }, 13000);
}

function setupEventListeners() {
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startWebsite);
    }
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeSlide(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeSlide(1));
    }
    
    const celebrateBtn = document.getElementById('celebrateBtn');
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', startCelebration);
    }
    
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
    
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.addEventListener('click', blowCandle);
    });


    document.addEventListener('keydown', handleKeyPress);
}

function blowCandle(e) {
    const flame = e.target;
    const candle = flame.closest('.candle-number');

    flame.style.animation = 'flame-blow-out 0.5s ease-out forwards';

    setTimeout(() => {
        flame.style.display = 'none';

        const smoke = document.createElement('div');
        smoke.textContent = '💨';
        smoke.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 30px;
            animation: smoke-rise 2s ease-out forwards;
        `;
        candle.appendChild(smoke);

        setTimeout(() => smoke.remove(), 2000);

        const allFlames = document.querySelectorAll('.flame');
        const visibleFlames = Array.from(allFlames).filter(f => f.style.display !== 'none');

        if (visibleFlames.length === 0) {
            setTimeout(() => {
                showToast('🎉 Yeay! Semua lilin sudah ditiup! 🎂');
                createConfetti(50);
            }, 500);
        }
    }, 500);
}

function handleKeyPress(e) {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent || !mainContent.classList.contains('active')) {
        return;
    }
    
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
}

function startWebsite() {
    const welcomeSection = document.getElementById('welcomeSection');
    const mainContent = document.getElementById('mainContent');
    
    welcomeSection.style.opacity = '0';
    welcomeSection.style.transform = 'scale(0.9)';
    welcomeSection.style.transition = 'all 0.5s ease-out';
    
    setTimeout(() => {
        welcomeSection.classList.remove('active');
        mainContent.classList.add('active');
        
        createConfetti(50);
    }, 500);
}

function changeSlide(direction) {
    const newSlide = currentSlide + direction;
    
    if (newSlide < 1 || newSlide > totalSlides) {
        return;
    }
    
    const currentSlideEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (currentSlideEl) {
        currentSlideEl.classList.remove('active');
    }
    
    currentSlide = newSlide;
    
    const newSlideEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (newSlideEl) {
        newSlideEl.classList.add('active');
    }
    
    updateNavigation();
    
    if (currentSlide === 4) {
        animatePhotos();
    } else if (currentSlide === 7) {
        animateBalloons();
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
    }
    
    if (pageIndicator) {
        pageIndicator.textContent = `${currentSlide} / ${totalSlides}`;
    }
}

function animatePhotos() {
    const photos = document.querySelectorAll('.photo-frame');
    photos.forEach((photo, index) => {
        setTimeout(() => {
            photo.style.animation = 'none';
            setTimeout(() => {
                photo.style.animation = `spinIn 0.8s ease-out ${index * 0.2}s`;
            }, 10);
        }, 100);
    });
}

function animateBalloons() {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon, index) => {
        setTimeout(() => {
            balloon.style.animation = 'none';
            setTimeout(() => {
                balloon.style.animation = `balloon-float 3s ease-in-out infinite ${index * 0.2}s`;
            }, 10);
        }, 100);
    });
}

function startCelebration() {
    createConfetti(100);
    
    createFireworks(30);
    
    const celebrateBtn = document.getElementById('celebrateBtn');
    if (celebrateBtn) {
        celebrateBtn.style.animation = 'celebration-pulse 0.3s ease-in-out 5';
    }
    
    if (!musicPlaying) {
        startMusic('external');
    }
    
    setTimeout(() => {
        // alert('🎉 Selamat Ulang Tahun Sayangku! Semoga hari ini penuh kebahagiaan! 💜💚');
        Swal.fire({
            title: '🎉 Selamat Ulang Tahun Sayangku! 🎂',
            text: 'Semoga hari ini penuh kebahagiaan dan cinta! 💜💚',
            icon: 'success',
            confirmButtonText: 'Terima Kasih! 🥰',
            background: '#fff',
            confirmButtonColor: '#764ba2',
            customClass: {
                title: 'swal2-title',
                content: 'swal2-content',
                confirmButton: 'swal2-confirm-button'
            }
        });
    }, 1000);
}

function createConfetti(count) {
    const container = document.getElementById('confettiContainer');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#ff6b9d', '#ffa07a', '#ffeb3b', '#4caf50'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

function createFireworks(count) {
    const container = document.getElementById('fireworksContainer');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#ff6b9d', '#ffa07a', '#ffeb3b'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.7;
            createFireworkBurst(container, x, y, colors[Math.floor(Math.random() * colors.length)]);
        }, i * 200);
    }
}

function createFireworkBurst(container, x, y, color) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function createMusicContext() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
    
    externalAudio = new Audio();
    externalAudio.loop = true;
    externalAudio.volume = 0.7;
    externalAudio.preload = 'auto';
    
    externalAudio.addEventListener('canplay', function() {
        console.log('Audio ready to play');
    });
    
    externalAudio.addEventListener('playing', function() {
        console.log('Audio is playing');
    });
    
    externalAudio.addEventListener('pause', function() {
        console.log('Audio paused');
    });
    
    externalAudio.addEventListener('ended', function() {
        console.log('Audio ended');
        if (musicPlaying && currentMusicType === 'external') {
            this.currentTime = 0;
            this.play();
        }
    });
    
    externalAudio.addEventListener('error', function(e) {
        console.error('Error loading audio file:', e);
        console.error('Error details:', {
            code: e.target.error.code,
            message: e.target.error.message
        });
        
        let errorMessage = 'Maaf, file musik tidak dapat dimuat.\n\n';
        errorMessage += 'Kemungkinan penyebab:\n';
        errorMessage += '1. File "nadhif-basalamah-bergema.mp3" tidak ada di folder yang sama\n';
        errorMessage += '2. Nama file tidak sama persis (termasuk huruf besar/kecil dan spasi)\n';
        errorMessage += '3. Format file tidak didukung browser\n\n';
        errorMessage += 'Pastikan file MP3 ada di folder yang sama dengan index.html';
        
        // alert(errorMessage);
        Swal.fire({
            title: 'Error Memuat Musik',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Mengerti',
            background: '#fff',
            confirmButtonColor: '#764ba2',
            customClass: {
                title: 'swal2-title',
                content: 'swal2-content',
                confirmButton: 'swal2-confirm-button'
            }
        });
        console.warn(errorMessage);
        
        musicPlaying = false;
        currentMusicType = null;
        const musicBtn = document.getElementById('musicBtn');
        const musicNote = document.getElementById('musicNote');
        if (musicBtn) musicBtn.classList.remove('playing');
        if (musicNote) musicNote.classList.remove('active');
    });
}

function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    const musicNote = document.getElementById('musicNote');
    
    if (musicPlaying) {
        stopMusic();
        musicBtn.classList.remove('playing');
        musicNote.classList.remove('active');
        musicPlaying = false;
    } else {
        showMusicSelectionMenu();
    }
}

function showMusicSelectionMenu() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const menuContainer = document.createElement('div');
    menuContainer.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px;
        border-radius: 30px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        text-align: center;
        max-width: 500px;
        animation: scaleIn 0.4s ease-out;
    `;
    
    const title = document.createElement('h2');
    title.textContent = 'Pilih Lagu 🎵';
    title.style.cssText = `
        color: white;
        font-size: 2.5em;
        margin-bottom: 30px;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    `;
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 20px;
    `;
    
    const btn1 = document.createElement('button');
    btn1.innerHTML = '🎂 Happy Birthday Melody<br><small style="font-size: 0.8em; opacity: 0.9;">Lagu ulang tahun klasik</small>';
    btn1.style.cssText = `
        padding: 20px 40px;
        font-size: 1.3em;
        background: white;
        color: #764ba2;
        border: none;
        border-radius: 15px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    btn1.onmouseover = () => {
        btn1.style.transform = 'scale(1.05)';
        btn1.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
    };
    btn1.onmouseout = () => {
        btn1.style.transform = 'scale(1)';
        btn1.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    };
    btn1.onclick = () => {
        startMusic('melody');
        document.body.removeChild(modal);
    };
    
    const btn2 = document.createElement('button');
    btn2.innerHTML = '💕 Bergema Sampai Selamanya<br><small style="font-size: 0.8em; opacity: 0.9;">Nadhif Basalamah</small>';
    btn2.style.cssText = `
        padding: 20px 40px;
        font-size: 1.3em;
        background: white;
        color: #764ba2;
        border: none;
        border-radius: 15px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    btn2.onmouseover = () => {
        btn2.style.transform = 'scale(1.05)';
        btn2.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
    };
    btn2.onmouseout = () => {
        btn2.style.transform = 'scale(1)';
        btn2.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    };
    btn2.onclick = () => {
        startMusic('external');
        document.body.removeChild(modal);
    };
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕ Tutup';
    closeBtn.style.cssText = `
        margin-top: 20px;
        padding: 12px 30px;
        font-size: 1em;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 2px solid white;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s;
    `;
    closeBtn.onmouseover = () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    };
    closeBtn.onmouseout = () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    };
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };
    
    buttonsContainer.appendChild(btn1);
    buttonsContainer.appendChild(btn2);
    menuContainer.appendChild(title);
    menuContainer.appendChild(buttonsContainer);
    menuContainer.appendChild(closeBtn);
    modal.appendChild(menuContainer);
    
    document.body.appendChild(modal);
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

function startMusic(type) {
    const musicBtn = document.getElementById('musicBtn');
    const musicNote = document.getElementById('musicNote');
    const nowPlaying = document.getElementById('nowPlaying');
    
    stopMusic();
    
    musicPlaying = true;
    currentMusicType = type;
    musicBtn.classList.add('playing');
    musicNote.classList.add('active');
    
    if (type === 'melody') {
        playBirthdayMelody();
        showToast('🎂 Memainkan Happy Birthday Melody');
        if (nowPlaying) {
            nowPlaying.textContent = '🎂 Happy Birthday';
            nowPlaying.classList.add('active');
        }
    } else if (type === 'external') {
        playExternalMusic();
        showToast('💕 Memainkan Lagumu Yang Ku Tanam Di Lagu ini');
        if (nowPlaying) {
            nowPlaying.textContent = '💕 Nadhif Basalamah';
            nowPlaying.classList.add('active');
        }
    }
}

function playExternalMusic() {
    if (!externalAudio) {
        console.error('External audio not initialized');
        // alert('Audio player belum siap. Coba refresh halaman.');
        Swal.fire({
            title: 'Error Audio',
            text: 'Audio player belum siap. Coba refresh halaman.',
            icon: 'error',
            confirmButtonText: 'Mengerti',
            background: '#fff',
            confirmButtonColor: '#764ba2',
            customClass: {
                title: 'swal2-title',
                content: 'swal2-content',
                confirmButton: 'swal2-confirm-button'
            }
        });
        return;
    }
    
    console.log('Attempting to play external music...');
    
    externalAudio.src = 'nadhif-basalamah-bergema.mp3';
    
    externalAudio.load();
    
    console.log('Audio source set to:', externalAudio.src);
    
    const playPromise = externalAudio.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Audio playing successfully!');
            })
            .catch(error => {
                console.error('Error playing audio:', error);
                
                const alternativeNames = [
                    'nadhif.mp3',
                    'bergema.mp3',
                    'Nadhif Basalamah - Bergema Sampai Selamanya (Lyrics).mp3',
                    'Nadhif_Basalamah_Bergema_Sampai_Selamanya.mp3'
                ];
                
                let errorMsg = 'Tidak dapat memutar lagu.\n\n';
                errorMsg += 'Solusi:\n';
                errorMsg += '1. Pastikan file MP3 ada di folder yang sama dengan index.html\n';
                errorMsg += '2. Coba ganti nama file menjadi salah satu dari:\n';
                alternativeNames.forEach(name => {
                    errorMsg += '   - ' + name + '\n';
                });
                errorMsg += '3. Atau update nama file di code (baris externalAudio.src)\n';
                errorMsg += '4. Pastikan browser mengizinkan autoplay (klik halaman dulu)\n\n';
                errorMsg += 'Error: ' + error.message;
                
                // alert(errorMsg);
                Swal.fire({
                    title: 'Error Memutar Musik',
                    text: errorMsg,
                    icon: 'error',
                    confirmButtonText: 'Mengerti',
                    background: '#fff',
                    confirmButtonColor: '#764ba2',
                    customClass: {
                        title: 'swal2-title',
                        content: 'swal2-content',
                        confirmButton: 'swal2-confirm-button'
                    }
                });

                console.warn('Possible alternative filenames:', alternativeNames + "\n" + errorMsg);
                
                musicPlaying = false;
                currentMusicType = null;
                const musicBtn = document.getElementById('musicBtn');
                const musicNote = document.getElementById('musicNote');
                if (musicBtn) musicBtn.classList.remove('playing');
                if (musicNote) musicNote.classList.remove('active');
            });
    }
}

let musicInterval = null;

function playBirthdayMelody() {
    if (!audioContext) {
        return;
    }
    
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    const melody = [
        { freq: 262, duration: 400 }, // C
        { freq: 262, duration: 200 }, // C
        { freq: 294, duration: 600 }, // D
        { freq: 262, duration: 600 }, // C
        { freq: 349, duration: 600 }, // F
        { freq: 330, duration: 1200 }, // E
        
        { freq: 262, duration: 400 }, // C
        { freq: 262, duration: 200 }, // C
        { freq: 294, duration: 600 }, // D
        { freq: 262, duration: 600 }, // C
        { freq: 392, duration: 600 }, // G
        { freq: 349, duration: 1200 }, // F
        
        { freq: 262, duration: 400 }, // C
        { freq: 262, duration: 200 }, // C
        { freq: 523, duration: 600 }, // C5
        { freq: 440, duration: 600 }, // A
        { freq: 349, duration: 600 }, // F
        { freq: 330, duration: 600 }, // E
        { freq: 294, duration: 600 }, // D
        
        { freq: 466, duration: 400 }, // Bb
        { freq: 466, duration: 200 }, // Bb
        { freq: 440, duration: 600 }, // A
        { freq: 349, duration: 600 }, // F
        { freq: 392, duration: 600 }, // G
        { freq: 349, duration: 1200 }  // F
    ];
    
    let noteIndex = 0;
    
    function playNextNote() {
        if (!musicPlaying || noteIndex >= melody.length) {
            noteIndex = 0;
            if (musicPlaying) {
                setTimeout(playNextNote, 1000);
            }
            return;
        }
        
        const note = melody[noteIndex];
        playTone(note.freq, note.duration);
        noteIndex++;
        
        setTimeout(playNextNote, note.duration + 50);
    }
    
    playNextNote();
}

function playTone(frequency, duration) {
    if (!audioContext) {
        return;
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

function stopMusic() {
    musicPlaying = false;
    currentMusicType = null;

    const nowPlaying = document.getElementById('nowPlaying');
    if (nowPlaying) {
        nowPlaying.classList.remove('active');
    }
    
    if (externalAudio) {
        externalAudio.pause();
        externalAudio.currentTime = 0;
    }
    
    if (musicInterval) {
        clearInterval(musicInterval);
        musicInterval = null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const favCards = document.querySelectorAll('.fav-card');
    favCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(5deg) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0) scale(1)';
        });
    });
    
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'bounce 0.5s ease-in-out';
            }, 10);
            
            const foodName = this.querySelector('p').textContent;
            showToast(`Yummy! ${foodName} emang enak banget! 😋`);
        });
    });
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideUp 0.3s ease-out;
        font-size: 1.1em;
        font-weight: bold;
        text-align: center;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2000);
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('keroppi-jump') || 
        e.target.classList.contains('keroppi-animated')) {
        createConfetti(30);
        showToast('Keroppi cinta kamu! 🐸💚');
        
        e.target.style.animation = 'none';
        setTimeout(() => {
            e.target.style.animation = 'jump 0.5s ease-in-out 3';
        }, 10);
    }
});

let angryClickCount = 0;
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('angry-emoji')) {
        angryClickCount++;
        
        if (angryClickCount >= 3) {
            showToast('Udah deh, jangan marah lagi ya sayang! 🥺💕');
            angryClickCount = 0;
            
            const originalEmoji = e.target.textContent;
            e.target.textContent = '😊';
            setTimeout(() => {
                e.target.textContent = originalEmoji;
            }, 2000);
        }
    }
});

document.addEventListener('contextmenu', function(e) {
    if (e.target.classList.contains('slide-title') || 
        e.target.classList.contains('glowing-text')) {
        e.preventDefault();
    }
});

console.log('%c💜 Website Ulang Tahun Spesial 💜', 'color: #764ba2; font-size: 24px; font-weight: bold;');
console.log('%c💚 Dibuat dengan penuh cinta untuk kamu! 💚', 'color: #4caf50; font-size: 16px;');
console.log('%c🎂 Selamat Ulang Tahun Sayangku! 🎂', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');

Swal.fire({
    title: '🎉 Selamat Ulang Tahun Sayangku! 🎂',
    text: 'web ini dibuat dengan penuh cinta untukmu! 💜💚\n\nKlik Mulai untuk memulai petualangan spesial ini!',
    icon: 'success',
    confirmButtonText: 'Mulai! 🥳',
    background: '#fff',
    confirmButtonColor: '#764ba2',
    customClass: {
        title: 'swal2-title',
        content: 'swal2-content',
        confirmButton: 'swal2-confirm-button'
    }
});

document.getElementById('celebrateBtn').addEventListener('click', function () {
    Swal.fire({
        title: 'Selamat Merayakan! 🎉',
        text: 'Tulis pesanmu dan kirimkan ke WhatsApp!',
        icon: 'success',
        confirmButtonText: 'Oke!'
    });
});

document.getElementById('sendMessageBtn').addEventListener('click', function () {
    let message = document.getElementById('whatsappMessage').value.trim();

    if (message === '') {
        message = 'Makasih ya sayanggg sudah merayakan hari ulang tahun ku 💜💚';
    }

    // if (message === '') {
    //     Swal.fire({
    //         title: 'Pesan kosong!',
    //         text: 'Tolong tulis pesan sebelum mengirim.',
    //         icon: 'warning',
    //         confirmButtonText: 'Oke'
    //     });
    //     return;
    // }

    const phoneNumber = ''; // Format: 62 untuk Indonesia
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');
    Swal.fire({
        title: 'Pesan Terkirim!',
        text: 'Pesanmu telah dikirim ke WhatsApp.',
        icon: 'success',
        confirmButtonText: 'Oke'
    });
});