// Main JavaScript for Sakuteru Landing Page
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80; // Navigation bar height
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation Bar Scroll Effect
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('shadow-lg');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sectionsToAnimate = document.querySelectorAll('section:not(#home)');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards and special elements
    const cardsToAnimate = document.querySelectorAll('.bg-white.rounded-2xl, .bg-gradient-to-r');
    cardsToAnimate.forEach(card => {
        observer.observe(card);
    });
    
    // Counter Animation for Statistics (if added later)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Parallax Effect for Hero Section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // Dynamic Particle Background (Lightweight version)
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-bg';
        heroSection?.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // Create particles only if user prefers motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        createParticles();
    }
    
    // Typing Effect for Hero Title (Optional)
    function typeEffect(element, text, speed = 100) {
        if (!element) return;
        
        element.textContent = '';
        let i = 0;
        
        function typeChar() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            }
        }
        
        typeChar();
    }
    
    // Button Hover Effects
    const buttons = document.querySelectorAll('button, .btn-tea-primary, .btn-tea-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Form Handling (if forms are added later)
    function handleFormSubmit(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('お問い合わせありがとうございます！', 'success');
                
                // Reset form
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Notification System
    function showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all transform translate-x-full`;
        
        const bgClasses = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-white',
            info: 'bg-blue-500 text-white'
        };
        
        notification.className += ` ${bgClasses[type] || bgClasses.info}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
    
    // Lazy Loading for Images (if images are added)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Page Load Performance Monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        if (loadTime > 3000) {
            console.warn('Page load time is slow:', Math.round(loadTime), 'ms');
        }
    });
    
    // Scroll to Top Button
    function createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'fixed bottom-6 right-6 bg-tea-dark text-white p-3 rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 hover:bg-tea-green z-40';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollBtn.classList.add('opacity-100');
            } else {
                scrollBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollBtn.classList.remove('opacity-100');
            }
        });
    }
    
    createScrollToTopButton();
    
    // Festival Countdown Timer (for the event date)
    function createCountdown() {
        const festivalDate = new Date('2025-11-02T10:00:00');
        const countdownElement = document.createElement('div');
        countdownElement.className = 'text-center mt-8 p-6 bg-white/10 rounded-xl';
        
        function updateCountdown() {
            const now = new Date();
            const difference = festivalDate - now;
            
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                
                countdownElement.innerHTML = `
                    <h3 class="text-xl font-bold text-white mb-4">相模女子大学 相生祭 まであと</h3>
                    <div class="grid grid-cols-4 gap-4 text-center">
                        <div class="bg-white/20 rounded-lg p-3">
                            <div class="text-2xl font-bold text-white">${days}</div>
                            <div class="text-tea-light text-sm">日</div>
                        </div>
                        <div class="bg-white/20 rounded-lg p-3">
                            <div class="text-2xl font-bold text-white">${hours}</div>
                            <div class="text-tea-light text-sm">時間</div>
                        </div>
                        <div class="bg-white/20 rounded-lg p-3">
                            <div class="text-2xl font-bold text-white">${minutes}</div>
                            <div class="text-tea-light text-sm">分</div>
                        </div>
                        <div class="bg-white/20 rounded-lg p-3">
                            <div class="text-2xl font-bold text-white">${seconds}</div>
                            <div class="text-tea-light text-sm">秒</div>
                        </div>
                    </div>
                `;
            } else {
                countdownElement.innerHTML = `
                    <h3 class="text-2xl font-bold text-white">学園祭開催中！</h3>
                    <p class="text-tea-light mt-2">茶くてるブースでお待ちしています！</p>
                `;
            }
        }
        
        // Add countdown to festival section
        const festivalSection = document.getElementById('festival');
        const festivalContainer = festivalSection?.querySelector('.container');
        if (festivalContainer) {
            festivalContainer.appendChild(countdownElement);
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
    }
    
    createCountdown();
    
    // Easter Egg: Konami Code
    let konamiCode = [];
    const correctCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        konamiCode.splice(-correctCode.length - 1, konamiCode.length - correctCode.length);
        
        if (konamiCode.join(',').indexOf(correctCode.join(',')) >= 0) {
            showNotification('🍃 佐野川茶の秘密を発見しました！特別な茶くてるをお楽しみください！', 'success', 8000);
            // Add special visual effect
            document.body.style.animation = 'gradient-shift 3s ease';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 3000);
        }
    });
    
    console.log('🍃 茶くてるランディングページが正常に読み込まれました！');
    console.log('佐野川茶の持続可能な未来のために、ありがとうございます。');
});