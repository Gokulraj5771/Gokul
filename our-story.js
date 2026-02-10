document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1200,
        once: true,
        offset: 100,
        easing: 'ease-in-out-cubic'
    });

    // Floating Hearts Background Animation
    const heartContainer = document.getElementById('heart-bg');
    const heartSymbols = ['❤️', '💖', '💕', '🥰', '🌸', '✨'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random Position
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Random Size
        const size = Math.random() * 20 + 10; // 10px to 30px
        heart.style.fontSize = size + 'px';
        
        // Random Animation Duration
        const duration = Math.random() * 10 + 10; // 10s to 20s
        heart.style.animationDuration = duration + 's';
        
        // Random Opacity
        heart.style.opacity = Math.random() * 0.5 + 0.1;

        heartContainer.appendChild(heart);

        // Remove after animation ends to prevent memory leak
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Create hearts periodically
    setInterval(createHeart, 800);

    // Create initial batch
    for(let i=0; i<15; i++) {
        setTimeout(createHeart, i * 300);
    }

    // Click Effect: Burst of Hearts
    document.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        for(let i=0; i<10; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            heart.style.position = 'fixed';
            heart.style.transition = 'all 1s ease-out';
            heart.style.opacity = '1';
            heart.style.animation = 'none'; // Overwrite default animation
            
            document.body.appendChild(heart);
            
            // Scatter effect
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            setTimeout(() => {
                heart.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                heart.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    });

    // Typewriter effect for a specific note if desired (Adding a subtle effect)
    // Looking for Elements with class 'typewriter'
    const typewriters = document.querySelectorAll('.typewriter');
    typewriters.forEach(elem => {
        const text = elem.innerText;
        elem.innerText = '';
        let i = 0;
        
        const typeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const typing = setInterval(() => {
                        if (i < text.length) {
                            elem.innerText += text.charAt(i);
                            i++;
                        } else {
                            clearInterval(typing);
                        }
                    }, 50); // Speed of typing
                    typeObserver.unobserve(elem);
                }
            });
        });
        
        typeObserver.observe(elem);
    });
});
