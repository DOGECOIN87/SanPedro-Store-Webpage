// Advanced Particle System for Visual Enhancement
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        // Default options
        this.options = {
            particleCount: 50,
            particleSize: 2,
            particleSpeed: 0.5,
            particleColor: 'rgba(255, 255, 255, 0.3)',
            connectionDistance: 100,
            mouseInteraction: true,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.resize();
    }
    
    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * this.options.particleSpeed,
            vy: (Math.random() - 0.5) * this.options.particleSpeed,
            size: Math.random() * this.options.particleSize + 1,
            opacity: Math.random() * 0.5 + 0.1,
            originalOpacity: Math.random() * 0.5 + 0.1
        };
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        if (this.options.mouseInteraction) {
            this.container.addEventListener('mousemove', (e) => {
                const rect = this.container.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });
        }
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Mouse interaction
            if (this.options.mouseInteraction) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.opacity = particle.originalOpacity + force * 0.5;
                    particle.size = particle.size + force * 2;
                } else {
                    particle.opacity = particle.originalOpacity;
                }
            }
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.connectionDistance) {
                    const opacity = (this.options.connectionDistance - distance) / this.options.connectionDistance * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Floating Geometric Shapes
class FloatingShapes {
    constructor(container, options = {}) {
        this.container = container;
        this.shapes = [];
        this.options = {
            shapeCount: 8,
            minSize: 20,
            maxSize: 60,
            speed: 0.3,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.createShapes();
        this.animate();
    }
    
    createShapes() {
        for (let i = 0; i < this.options.shapeCount; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            
            const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const rotation = Math.random() * 360;
            const animationDuration = Math.random() * 20 + 10;
            
            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: ${Math.random() > 0.5 ? '50%' : '10px'};
                transform: rotate(${rotation}deg);
                animation: floatShape ${animationDuration}s ease-in-out infinite;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.container.appendChild(shape);
            this.shapes.push(shape);
        }
    }
    
    animate() {
        // Shapes are animated via CSS animations
        // This method can be extended for more complex animations
    }
    
    destroy() {
        this.shapes.forEach(shape => {
            if (shape.parentNode) {
                shape.parentNode.removeChild(shape);
            }
        });
        this.shapes = [];
    }
}

// Export for use in other files
window.ParticleSystem = ParticleSystem;
window.FloatingShapes = FloatingShapes;