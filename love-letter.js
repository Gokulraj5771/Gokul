document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // 1️⃣ Intro Animation
    const introTl = gsap.timeline({
        onComplete: () => {
            // Auto-scroll hint after intro
            gsap.to('#scroll-hint', { opacity: 1, duration: 2 });
            
            // Optionally auto-scroll deeply
            // gsap.to(window, { duration: 2, scrollTo: { y: window.innerHeight }, delay: 2, ease: "power2.inOut" });
        }
    });

    const splitText = document.querySelector('.split-text');
    if (splitText) {
        // Simple letter split for animation
        const text = splitText.innerText;
        splitText.innerHTML = text.split('').map(char => `<span class='char opacity-0 inline-block'>${char === ' ' ? '&nbsp;' : char}</span>`).join('');
        
        introTl.to('.char', {
            opacity: 1,
            y: 0,
            duration: 0.1,
            stagger: 0.05,
            ease: "power2.out"
        })
        .to('.split-text', { opacity: 1, duration: 1 }, "<");
    }

    // 2️⃣ Message Reveals on Scroll
    const revealSections = document.querySelectorAll('.reveal-text');
    revealSections.forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
                // markers: true
            },
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out"
        });
    });

    // 3️⃣ Heartbeat Interaction
    const heartContainer = document.getElementById('heart-container');
    const unlockedMsg = document.getElementById('unlocked-msg');
    
    if (heartContainer) {
        heartContainer.addEventListener('click', () => {
            // Pulse animation
            gsap.to(heartContainer, {
                scale: 1.5,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    gsap.to(heartContainer, { scale: 1, duration: 0.2 });
                }
            });

            // Glow effect
            gsap.to('#heart-glow', { opacity: 1, duration: 0.2, yoyo: true, repeat: 1 });

            // Reveal hidden message
            if (unlockedMsg.classList.contains('hidden')) {
                unlockedMsg.classList.remove('hidden');
                
                gsap.fromTo(unlockedMsg, 
                    { opacity: 0, height: 0 }, 
                    { opacity: 1, height: '100vh', duration: 1.5, ease: "power2.out" }
                );
                
                // Animate inner text manually to ensure visibility
                const innerText = unlockedMsg.querySelector('.reveal-text');
                if (innerText) {
                    gsap.to(innerText, { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1.5, 
                        delay: 1, 
                        ease: "power3.out",
                        overwrite: true // Ensure this overrides any scrollTrigger conflict
                    });
                }
                
                gsap.to(window, { scrollTo: unlockedMsg, duration: 1.5, delay: 0.5 });
                
                // Refresh ScrollTrigger to ensure other elements are recalculated
                setTimeout(() => ScrollTrigger.refresh(), 1000);
            }
        });
    }

    // 4️⃣ Letter Section Typing/Reveal Effect
    const letterLines = document.querySelectorAll('.letter-line');
    letterLines.forEach((line, index) => {
        gsap.to(line, {
            scrollTrigger: {
                trigger: line,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.5,
            ease: "power2.out"
        });
    });

    // 5️⃣ Final Confession Parallax
    gsap.to('.final-text', {
        scrollTrigger: {
            trigger: '.final-text-container',
            start: "top 70%",
        },
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power3.out"
    });
    
    gsap.to('.final-subtext', {
        scrollTrigger: {
            trigger: '.final-text-container',
            start: "top 60%",
        },
        opacity: 1,
        y: 0,
        duration: 2,
        delay: 1,
        ease: "power2.out"
    });

    // Rising Hearts in Background
    const risingHeartsContainer = document.getElementById('rising-hearts');
    function createRisingHeart() {
        if (!risingHeartsContainer) return;
        const heart = document.createElement('div');
        heart.innerText = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-20px';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5;
        heart.style.transition = `bottom ${Math.random() * 5 + 5}s linear, opacity 5s`;
        
        risingHeartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.style.bottom = '100%';
            heart.style.opacity = 0;
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }
    
    // Start rising hearts only when in view
    ScrollTrigger.create({
        trigger: '#rising-hearts',
        start: "top bottom",
        onEnter: () => setInterval(createRisingHeart, 500)
    });

    // 6️⃣ Ending Interaction
    const endBtn = document.getElementById('end-btn');
    const finalOverlay = document.getElementById('final-message');

    if (endBtn) {
        endBtn.addEventListener('click', () => {
            gsap.to(finalOverlay, {
                opacity: 1,
                pointerEvents: 'all',
                duration: 2,
                onComplete: () => {
                    // Optional redirect or just stay
                }
            });
        });
    }

    // Custom Cursor Movement
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        if(cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            // Center the dot
            cursorDot.style.transform = `translate(-50%, -50%)`;
        }

        // Outline follows with delay (handled by CSS transition or GSAP lag)
        if(cursorOutline) {
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
            
             // Center the outline transform is a bit tricky with animate, 
             // better to use GSAP for smooth following if possible, but CSS is okay.
             // Let's refine with GSAP for smoother feel
             gsap.to(cursorOutline, {
                x: posX,
                y: posY,
                duration: 0.15,
                ease: "power2.out",
                xPercent: -50,
                yPercent: -50
             });
        }
    });

    // 7️⃣ Fireflies Animation
    const fireflyContainer = document.getElementById('fireflies-container');
    if (fireflyContainer) {
        // Clear potential previous content
        fireflyContainer.innerHTML = '';
        
        const fireflyCount = 30;
        for (let i = 0; i < fireflyCount; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');
            
            // Random positioning and animation properties
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 10 + 10; // 10-20s duration
            const delay = Math.random() * 5;
            
            firefly.style.left = `${left}%`;
            firefly.style.top = `${top}%`;
            firefly.style.width = `${size}px`;
            firefly.style.height = `${size}px`;
            
            // Apply custom animation properties directly since we're generating them
            firefly.style.animation = `fly ${duration}s infinite linear`;
            firefly.style.animationDelay = `-${delay}s`; 
            
            fireflyContainer.appendChild(firefly);
        }
    }
    // Background Music Logic
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-control');

    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            if (musicBtn) musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().catch(e => console.log("Audio play blocked by browser."));
            if (musicBtn) musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }

    // Attempt playback on load
    if (bgMusic) {
        bgMusic.play().then(() => {
            isPlaying = true;
            if (musicBtn) musicBtn.classList.add('playing');
        }).catch(e => {
            console.log("Autoplay blocked. Waiting for interaction.");
        });
    }

    // Interaction fallback
    const startAudio = () => {
        if (!isPlaying) {
            toggleMusic();
        }
        document.removeEventListener('click', startAudio);
        document.removeEventListener('touchstart', startAudio);
    };

    document.addEventListener('click', startAudio);
    document.addEventListener('touchstart', startAudio);
});
