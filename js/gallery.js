// Gallery functionality for restaurant business listing
class Gallery {
    constructor() {
        this.images = [
            '20250912_142555.jpg',
            '20250912_142601.jpg',
            '20250912_142608.jpg',
            '20250912_142613.jpg',
            '20250912_142620.jpg',
            '20250912_142644.jpg',
            '20250912_142651.jpg',
            '20250912_142654.jpg',
            '20250912_142719.jpg',
            '20250912_142721.jpg',
            '20250912_142723.jpg',
            '20250912_142729.jpg',
            '20250912_142735.jpg',
            '20250912_142746.jpg',
            '20250912_142751.jpg',
            '20250912_142753.jpg',
            '20250912_142812.jpg',
            '20250912_142814.jpg',
            '20250912_142816.jpg',
            '20250912_142824.jpg',
            '20250912_142825.jpg',
            '20250912_142827.jpg',
            '20250912_142830.jpg',
            '20250912_142832.jpg',
            '20250912_142833.jpg',
            '20250912_142845.jpg',
            '20250912_142850.jpg',
            '20250912_142856.jpg',
            '20250912_142902.jpg',
            '20250912_142930.jpg',
            '20250912_142934.jpg',
            '20250912_143023.jpg'
        ];
        
        this.currentIndex = 0;
        this.totalImages = this.images.length;
        
        // DOM elements
        this.mainImage = document.getElementById('mainImage');
        this.imageCounter = document.getElementById('imageCounter');
        this.thumbnailsContainer = document.getElementById('thumbnails');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        // Modal elements
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalClose = document.getElementById('modalClose');
        this.modalPrev = document.getElementById('modalPrev');
        this.modalNext = document.getElementById('modalNext');
        
        this.init();
    }
    
    init() {
        this.loadImages();
        this.createThumbnails();
        this.bindEvents();
        this.showImage(0);
    }
    
    loadImages() {
        // Preload the first few images for better performance
        for (let i = 0; i < Math.min(5, this.images.length); i++) {
            const img = new Image();
            img.src = this.images[i];
        }
    }
    
    createThumbnails() {
        this.thumbnailsContainer.innerHTML = '';
        
        this.images.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imageSrc;
            thumbnail.alt = `Restaurant photo ${index + 1}`;
            thumbnail.className = 'gallery__thumbnail';
            thumbnail.dataset.index = index;
            
            // Add loading indicator
            thumbnail.addEventListener('load', () => {
                thumbnail.style.opacity = '1';
            });
            
            thumbnail.addEventListener('error', () => {
                thumbnail.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Ik00MCAyMEM0Ni42Mjc0IDIwIDUyIDI1LjM3MjYgNTIgMzJDNTIgMzguNjI3NCA0Ni42Mjc0IDQ0IDQwIDQ0QzMzLjM3MjYgNDQgMjggMzguNjI3NCAyOCAzMkMyOCAyNS4zNzI2IDMzLjM3MjYgMjAgNDAgMjBaIiBmaWxsPSIjZGVlMmU2Ii8+CjxwYXRoIGQ9Ik0yMCA1Nkw2MCA1NkM2MS4xMDQ2IDU2IDYyIDU1LjEwNDYgNjIgNTRWNTBMMjAgNTBWNTRDMjAgNTUuMTA0NiAyMC44OTU0IDU2IDIyIDU2WiIgZmlsbD0iI2RlZTJlNiIvPgo8L3N2Zz4K';
                thumbnail.alt = 'Image not available';
            });
            
            thumbnail.style.opacity = '0.7';
            
            thumbnail.addEventListener('click', () => {
                this.showImage(index);
            });
            
            // Add double-click to open modal functionality
            thumbnail.addEventListener('dblclick', () => {
                this.openModal(index);
            });
            
            // Make thumbnails keyboard accessible
            thumbnail.setAttribute('tabindex', '0');
            thumbnail.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showImage(index);
                } else if (e.key === 'Enter' && e.shiftKey) {
                    e.preventDefault();
                    this.openModal(index);
                }
            });
            
            this.thumbnailsContainer.appendChild(thumbnail);
        });
    }
    
    showImage(index) {
        if (index < 0 || index >= this.totalImages) return;
        
        this.currentIndex = index;
        
        // Update main image
        const newImageSrc = this.images[index];
        
        // Add loading state
        this.mainImage.style.opacity = '0.7';
        
        // Create new image to preload
        const newImage = new Image();
        newImage.onload = () => {
            this.mainImage.src = newImageSrc;
            this.mainImage.alt = `Restaurant business photo ${index + 1} of ${this.totalImages}`;
            this.mainImage.style.opacity = '1';
        };
        
        newImage.onerror = () => {
            this.mainImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Ik00NTAgMjAwQzQ3My4xOTYgMjAwIDQ5MiAyMTguODA0IDQ5MiAyNDJDNDkyIDI2NS4xOTYgNDczLjE5NiAyODQgNDUwIDI4NEM0MjYuODA0IDI4NCA0MDggMjY1LjE5NiA0MDggMjQyQzQwOCAyMTguODA0IDQyNi44MDQgMjAwIDQ1MCAyMDBaIiBmaWxsPSIjZGVlMmU2Ii8+CjxwYXRoIGQ9Ik0yMDAgMzUwTDcwMCAzNTBDNzA4LjI4NCAzNTAgNzE1IDM0My4yODQgNzE1IDMzNVYzMTBMMjAwIDMxMFYzMzVDMjAwIDM0My4yODQgMjA2LjcxNiAzNTAgMjE1IDM1MFoiIGZpbGw9IiNkZWUyZTYiLz4KPHR4dCB4PSI0NTAiIHk9IjM4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90eHQ+Cjwvc3ZnPgo=';
            this.mainImage.alt = 'Image not available';
            this.mainImage.style.opacity = '1';
        };
        
        newImage.src = newImageSrc;
        
        // Update counter
        this.updateCounter();
        
        // Update thumbnail active state
        this.updateThumbnailStates();
        
        // Preload next and previous images
        this.preloadAdjacentImages();
    }
    
    updateCounter() {
        this.imageCounter.textContent = `${this.currentIndex + 1} of ${this.totalImages}`;
    }
    
    updateThumbnailStates() {
        const thumbnails = this.thumbnailsContainer.querySelectorAll('.gallery__thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            if (index === this.currentIndex) {
                thumbnail.classList.add('gallery__thumbnail--active');
            } else {
                thumbnail.classList.remove('gallery__thumbnail--active');
            }
        });
    }
    
    preloadAdjacentImages() {
        // Preload next image
        if (this.currentIndex < this.totalImages - 1) {
            const nextImg = new Image();
            nextImg.src = this.images[this.currentIndex + 1];
        }
        
        // Preload previous image
        if (this.currentIndex > 0) {
            const prevImg = new Image();
            prevImg.src = this.images[this.currentIndex - 1];
        }
    }
    
    nextImage() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.showImage(nextIndex);
    }
    
    prevImage() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.showImage(prevIndex);
    }
    
    // Modal functionality
    openModal(index = null) {
        if (index !== null) {
            this.currentIndex = index;
        }
        
        this.modal.style.display = 'block';
        this.updateModalImage();
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus management for accessibility
        this.modalClose.focus();
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        
        // Return focus to main image for accessibility
        this.mainImage.focus();
    }
    
    updateModalImage() {
        const imageSrc = this.images[this.currentIndex];
        
        // Add loading state
        this.modalImage.style.opacity = '0.7';
        
        // Create new image to preload
        const newImage = new Image();
        newImage.onload = () => {
            this.modalImage.src = imageSrc;
            this.modalImage.alt = `Restaurant business photo ${this.currentIndex + 1} of ${this.totalImages}`;
            this.modalImage.style.opacity = '1';
        };
        
        newImage.onerror = () => {
            this.modalImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Ik00NTAgMjAwQzQ3My4xOTYgMjAwIDQ5MiAyMTguODA0IDQ5MiAyNDJDNDkyIDI2NS4xOTYgNDczLjE5NiAyODQgNDUwIDI4NEM0MjYuODA0IDI4NCA0MDggMjY1LjE5NiA0MDggMjQyQzQwOCAyMTguODA0IDQyNi44MDQgMjAwIDQ1MCAyMDBaIiBmaWxsPSIjZGVlMmU2Ii8+CjxwYXRoIGQ9Ik0yMDAgMzUwTDcwMCAzNTBDNzA4LjI4NCAzNTAgNzE1IDM0My4yODQgNzE1IDMzNVYzMTBMMjAwIDMxMFYzMzVDMjAwIDM0My4yODQgMjA2LjcxNiAzNTAgMjE1IDM1MFoiIGZpbGw9IiNkZWUyZTYiLz4KPHR4dCB4PSI0NTAiIHk9IjM4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90eHQ+Cjwvc3ZnPgo=';
            this.modalImage.alt = 'Image not available';
            this.modalImage.style.opacity = '1';
        };
        
        newImage.src = imageSrc;
        
        // Update main gallery to sync
        this.showImage(this.currentIndex);
    }
    
    nextImageModal() {
        const nextIndex = (this.currentIndex + 1) % this.totalImages;
        this.currentIndex = nextIndex;
        this.updateModalImage();
    }
    
    prevImageModal() {
        const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.currentIndex = prevIndex;
        this.updateModalImage();
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        // Click-to-enlarge functionality for main image
        this.mainImage.addEventListener('click', () => {
            this.openModal();
        });
        
        // Make main image focusable and add keyboard support
        this.mainImage.setAttribute('tabindex', '0');
        this.mainImage.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openModal();
            }
        });
        
        // Modal event listeners
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalPrev.addEventListener('click', () => this.prevImageModal());
        this.modalNext.addEventListener('click', () => this.nextImageModal());
        
        // Close modal when clicking outside the image
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Check if modal is open
            const isModalOpen = this.modal.style.display === 'block';
            
            if (isModalOpen) {
                // Modal keyboard navigation
                switch (e.key) {
                    case 'Escape':
                        e.preventDefault();
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prevImageModal();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextImageModal();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.currentIndex = 0;
                        this.updateModalImage();
                        break;
                    case 'End':
                        e.preventDefault();
                        this.currentIndex = this.totalImages - 1;
                        this.updateModalImage();
                        break;
                }
            } else {
                // Gallery keyboard navigation
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prevImage();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextImage();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.showImage(0);
                        break;
                    case 'End':
                        e.preventDefault();
                        this.showImage(this.totalImages - 1);
                        break;
                }
            }
        });
        
        // Enhanced touch/swipe support for main image
        this.setupTouchEvents(this.mainImage, false);
        
        // Touch/swipe support for modal
        this.setupTouchEvents(this.modalImage, true);
    }
    
    setupTouchEvents(element, isModal = false) {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let startTime = 0;
        
        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
        }, { passive: true });
        
        element.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            const timeDiff = endTime - startTime;
            
            // Check if it's a swipe (not a tap or scroll)
            const minSwipeDistance = 50;
            const maxSwipeTime = 300;
            const maxVerticalMovement = 100;
            
            if (Math.abs(diffX) > minSwipeDistance && 
                Math.abs(diffY) < maxVerticalMovement && 
                timeDiff < maxSwipeTime) {
                
                if (isModal) {
                    if (diffX > 0) {
                        this.nextImageModal();
                    } else {
                        this.prevImageModal();
                    }
                } else {
                    if (diffX > 0) {
                        this.nextImage();
                    } else {
                        this.prevImage();
                    }
                }
            }
        }, { passive: true });
        
        // Prevent default touch behavior only when necessary
        element.addEventListener('touchmove', (e) => {
            // Only prevent default if we're in a horizontal swipe
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(startX - currentX);
            const diffY = Math.abs(startY - currentY);
            
            if (diffX > diffY) {
                e.preventDefault();
            }
        });
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Gallery module loaded');
    const gallery = new Gallery();
});