// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Restaurant business listing page loaded');
    
    // Initialize hero video
    initializeHeroVideo();
    
    // Initialize particle system
    initializeParticleSystem();
    
    // Initialize floating shapes
    initializeFloatingShapes();
    
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
    
    // Add loading animation to page elements
    addLoadingAnimations();
    
    // Add scroll-triggered animations
    addScrollAnimations();
});

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const name = formData.get('name') || 'Anonymous';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const message = formData.get('message') || 'No message provided.';
    
    const subject = encodeURIComponent(`Inquiry about San Pedro Restaurant Business - ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `Message:\n${message}\n\n` +
        `This inquiry came from the website form.`
    );
    
    // Recipients: primary and second email
    const to = 'J70mustang@gmail.com,rboudaher@gmail.com';
    
    const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;
    
    console.log('Opening mailto URL:', mailtoUrl);
    
    // Open user's email client
    window.location.href = mailtoUrl;
    
    // Optional: Show a brief message before redirect
    showFormMessage('Opening your email client to send the inquiry...', 'success');
    
    // Reset form after a short delay (email client opens immediately)
    setTimeout(() => {
        form.reset();
    }, 1000);
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    
    // Insert message
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageEl, form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 5000);
}

function addLoadingAnimations() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function initializeHeroVideo() {
    const video = document.querySelector('.hero__video');
    const videoContainer = document.querySelector('.hero__video-container');
    
    if (!video || !videoContainer) return;
    
    // Create fallback background image from first gallery image
    const fallbackImage = '20250912_142555.jpg';
    
    // Set up video event handlers
    video.addEventListener('loadeddata', function() {
        console.log('Hero video loaded successfully');
        video.style.opacity = '1';
    });
    
    video.addEventListener('error', function(e) {
        console.warn('Hero video failed to load, using fallback image');
        handleVideoError(videoContainer, fallbackImage);
    });
    
    // Ensure video plays on mobile devices
    video.addEventListener('canplay', function() {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn('Video autoplay failed:', error);
                // On mobile, autoplay might be blocked, show fallback
                handleVideoError(videoContainer, fallbackImage);
            });
        }
    });
    
    // Pause video when not in viewport for performance
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {
                    // Autoplay failed, use fallback
                    handleVideoError(videoContainer, fallbackImage);
                });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });
    
    videoObserver.observe(video);
    
    // Add click handler to play/pause video
    video.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
    
    // Preload the video
    video.load();
}

function handleVideoError(container, fallbackImage) {
    // Create fallback background
    container.style.backgroundImage = `url('${fallbackImage}')`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.backgroundRepeat = 'no-repeat';
    
    // Hide the video element
    const video = container.querySelector('.hero__video');
    if (video) {
        video.style.display = 'none';
    }
    
    console.log('Using fallback background image for hero section');
}

function initializeParticleSystem() {
    // Particle system disabled to keep hero video clean
    console.log('Particle system disabled for clean video display');
}

function initializeFloatingShapes() {
    // Floating shapes disabled to keep hero video clean
    console.log('Floating shapes disabled for clean video display');
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.info-item, .quick-facts, .highlight-box');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}
