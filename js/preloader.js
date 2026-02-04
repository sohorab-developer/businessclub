// Preloader Script - Add this to your main.js file or create a new preloader.js

document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const audioIndicator = document.querySelector('.audio-indicator');
    
    // Audio setup for background music
    const audio = new Audio();
    audio.src = 'audio/intro-music.mp3'; // তোমার music file এর path দিবে
    audio.loop = true;
    audio.volume = 0.5;
    
    // Audio context for visual effects
    let audioContext;
    let analyser;
    let source;
    
    function initAudio() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 256;
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    // Start audio with user interaction
    audioIndicator.addEventListener('click', function() {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        if (audio.paused) {
            audio.play();
            audioIndicator.innerHTML = '<i class="fas fa-volume-up"></i>';
            audioIndicator.style.background = 'rgba(179, 21, 23, 0.3)';
        } else {
            audio.pause();
            audioIndicator.innerHTML = '<i class="fas fa-volume-mute"></i>';
            audioIndicator.style.background = 'rgba(179, 21, 23, 0.1)';
        }
    });
    
    // Simulate scope targeting effect
    function createScopeParticles() {
        const scopeContainer = document.querySelector('.scope-container');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'rgba(179, 21, 23, 0.7)';
            particle.style.borderRadius = '50%';
            particle.style.top = '50%';
            particle.style.left = '50%';
            particle.style.transform = 'translate(-50%, -50%)';
            
            // Random movement
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 1 + 0.5;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(
                        ${Math.cos(angle) * distance}px,
                        ${Math.sin(angle) * distance}px
                    ) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
            });
            
            scopeContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }
    }
    
    // Trigger particles at specific times
    setTimeout(createScopeParticles, 500);
    setTimeout(createScopeParticles, 1500);
    setTimeout(createScopeParticles, 2500);
    
    // Add ripple effects
    function createRipple() {
        const shockwave = document.querySelector('.shockwave');
        const ripple = shockwave.cloneNode(true);
        ripple.style.animation = 'shockwave 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards';
        document.querySelector('.scope-container').appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }
    
    setTimeout(createRipple, 3000);
    
    // Preloader completion
    setTimeout(() => {
        // Add final effects before hiding
        const finalShockwave = document.createElement('div');
        finalShockwave.className = 'shockwave';
        finalShockwave.style.animation = 'shockwave 1s cubic-bezier(0.19, 1, 0.22, 1) forwards';
        document.querySelector('.scope-container').appendChild(finalShockwave);
        
        // Add text transition
        const loadingText = document.querySelector('.loading-text');
        loadingText.textContent = 'WELCOME TO BFB-X';
        loadingText.style.color = '#b31517';
        loadingText.style.fontSize = '24px';
        loadingText.style.letterSpacing = '4px';
        loadingText.style.animation = 'textFade 1s forwards';
        
        // Hide preloader
        setTimeout(() => {
            preloader.classList.add('hide');
            
            // Fade out audio
            let fadeOut = setInterval(() => {
                if (audio.volume > 0.1) {
                    audio.volume -= 0.1;
                } else {
                    audio.pause();
                    clearInterval(fadeOut);
                }
            }, 100);
            
            // Show main content with animation
            document.body.style.overflow = 'auto';
            
            // Trigger AOS animations on main content
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        }, 1500);
    }, 4000); // Total preloader duration: 4 seconds
    
    // Initialize audio on first user interaction
    document.addEventListener('click', function initAudioOnClick() {
        initAudio();
        document.removeEventListener('click', initAudioOnClick);
    });
    
    // Update loading text based on progress
    const loadingText = document.querySelector('.loading-text');
    const textPhases = [
        "INITIALIZING...",
        "CALIBRATING SCOPE...",
        "TARGET ACQUIRED...",
        "LOADING BFB-X..."
    ];
    
    textPhases.forEach((text, index) => {
        setTimeout(() => {
            loadingText.textContent = text;
            loadingText.style.animation = 'none';
            setTimeout(() => {
                loadingText.style.animation = 'textFade 1s forwards';
            }, 10);
        }, index * 800);
    });
});