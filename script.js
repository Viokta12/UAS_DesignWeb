document.addEventListener('DOMContentLoaded', function() {

    // --- Kontrol Musik Latar ---
    const music = document.getElementById('background-music');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    let isMusicPlaying = false;

    // Fungsi untuk mencoba memutar musik (banyak browser memblokir autoplay)
    function attemptMusicPlay() {
        music.play().then(() => {
            isMusicPlaying = true;
            musicToggleBtn.textContent = '🔇 Musik';
        }).catch(error => {
            console.log("Autoplay diblokir. Pengguna harus berinteraksi terlebih dahulu.");
            isMusicPlaying = false;
            musicToggleBtn.textContent = '🔊 Musik';
        });
    }

    // Coba memutar musik saat halaman dimuat
    attemptMusicPlay();

    // Event listener untuk tombol musik
    musicToggleBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            music.pause();
            musicToggleBtn.textContent = '🔊 Musik';
        } else {
            music.play();
            musicToggleBtn.textContent = '🔇 Musik';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // --- Animasi Confetti ---
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiParticles = [];
    const confettiCount = 150;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = ['#ff6b9d', '#feca57', '#00e632ff', '#fc0505ff', '#ff9305ff'];

    class ConfettiParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.vx = Math.random() * 6 - 3;
            this.vy = Math.random() * 3 + 2;
            this.radius = Math.random() * 3 + 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.angle = Math.random() * 360;
            this.angleVel = Math.random() * 0.2 - 0.1;
        }

        update() {
            this.vx *= (1 - drag);
            this.vy = Math.min(this.vy + gravity, terminalVelocity);
            this.x += this.vx;
            this.y += this.vy;
            this.angle += this.angleVel;

            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
                this.vy = Math.random() * 3 + 2;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.radius / 2, -this.radius / 2, this.radius, this.radius * 2);
            ctx.restore();
        }
    }

    function initConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            confettiParticles.push(new ConfettiParticle());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateConfetti);
    }

    initConfetti();
    animateConfetti();

    // Menyesuaikan ukuran canvas saat window di-resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // --- Countdown Timer ---
    // GANTI TANGGAL DAN WAKTU TARGET DI SINI
    const eventDate = new Date("Oct 26, 2024 15:00:00").getTime();

    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<h2>Pesta telah dimulai!</h2>";
        }
    }, 1000);

    // --- Modal RSVP ---
    const rsvpBtn = document.getElementById('rsvp-button');
    const rsvpModal = document.getElementById('rsvp-modal');
    const closeBtn = document.querySelector('.close-btn');

    rsvpBtn.addEventListener('click', () => {
        rsvpModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        rsvpModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == rsvpModal) {
            rsvpModal.style.display = 'none';
        }
    });

});