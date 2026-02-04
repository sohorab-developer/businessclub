const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})







// Add this to your main.js or create slider.js
document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.category-tab-content');
    const tabIndicator = document.querySelector('.tab-indicator');
    const tabsContainer = document.querySelector('.category-tabs');
    
    function setTabIndicator(btn) {
        const tabRect = tabsContainer.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        
        tabIndicator.style.width = `${btnRect.width}px`;
        tabIndicator.style.left = `${btnRect.left - tabRect.left}px`;
    }
    
    // Initialize first tab
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn && tabIndicator) {
        setTabIndicator(activeBtn);
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update indicator position
            setTabIndicator(this);
            
            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
            
            // Reset all sliders to start
            const activeSlider = document.querySelector(`#${tabId} .slider-track`);
            if (activeSlider) {
                activeSlider.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Slider Functionality
    function initializeSlider(sliderContainer) {
        const track = sliderContainer.querySelector('.slider-track');
        const slides = sliderContainer.querySelectorAll('.event-slide');
        const prevBtn = sliderContainer.querySelector('.prev-btn');
        const nextBtn = sliderContainer.querySelector('.next-btn');
        
        if (!track || !slides.length) return;
        
        const slideWidth = slides[0].offsetWidth + 30; // width + gap
        let currentPosition = 0;
        const maxPosition = -(slideWidth * (slides.length - 3));
        
        function updateSlider() {
            track.style.transform = `translateX(${currentPosition}px)`;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPosition < 0) {
                    currentPosition += slideWidth;
                    updateSlider();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPosition > maxPosition) {
                    currentPosition -= slideWidth;
                    updateSlider();
                }
            });
        }
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left - next
                if (currentPosition > maxPosition) {
                    currentPosition -= slideWidth;
                    updateSlider();
                }
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right - previous
                if (currentPosition < 0) {
                    currentPosition += slideWidth;
                    updateSlider();
                }
            }
        }
        
        // Auto-slide every 5 seconds
        let autoSlideInterval;
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                if (currentPosition > maxPosition) {
                    currentPosition -= slideWidth;
                    updateSlider();
                } else {
                    currentPosition = 0;
                    updateSlider();
                }
            }, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Start auto-slide
        startAutoSlide();
        
        // Pause auto-slide on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        sliderContainer.addEventListener('touchstart', stopAutoSlide);
        sliderContainer.addEventListener('touchend', () => {
            setTimeout(startAutoSlide, 5000);
        });
    }
    
    // Initialize all sliders
    const sliders = document.querySelectorAll('.events-slider');
    sliders.forEach(slider => {
        initializeSlider(slider);
    });
    
    // Update slider on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            sliders.forEach(slider => {
                initializeSlider(slider);
            });
        }, 250);
    });
    
    // Event slide click effect
    document.querySelectorAll('.event-slide').forEach(slide => {
        slide.addEventListener('click', function(e) {
            if (!e.target.closest('.slide-link')) {
                this.style.transform = 'translateY(-10px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-15px) scale(1.02)';
                }, 150);
            }
        });
    });
});







// Add this to your main.js file
document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Add your newsletter submission logic here
            console.log('Newsletter subscription:', email);
            
            // Show success message
            const submitBtn = this.querySelector('button');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                this.reset();
            }, 2000);
        });
    }
    
    // Countdown Timer
    function updateCountdown() {
        const eventDate = new Date('2026-01-16T00:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        document.querySelectorAll('.timer-value.days').forEach(el => el.textContent = days.toString().padStart(2, '0'));
        document.querySelectorAll('.timer-value.hours').forEach(el => el.textContent = hours.toString().padStart(2, '0'));
        document.querySelectorAll('.timer-value.minutes').forEach(el => el.textContent = minutes.toString().padStart(2, '0'));
        document.querySelectorAll('.timer-value.seconds').forEach(el => el.textContent = seconds.toString().padStart(2, '0'));
    }
    
    // Initial call and set interval
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Floating action buttons
    const floatingBtns = document.querySelectorAll('.floating-action-btn');
    floatingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.classList.contains('whatsapp') ? 'WhatsApp' :
                        this.classList.contains('messenger') ? 'Messenger' : 'Help';
            
            // Add your action logic here
            console.log(`${type} button clicked`);
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Footer link hover effects
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });