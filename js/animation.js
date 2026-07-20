export function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from('.hero-content', {
        y: 60,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-badge, .hero-title, .hero-subtitle, .hero-buttons', {
        y: 30,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.2
    });
    
    gsap.from('.hero-visual', {
        x: 60,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.4
    });

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('mainNavbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            navbar.style.padding = '8px 0';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '12px 0';
        }
    });
}

export function animateCards(container) {
    const cards = container.querySelectorAll('.product-card');
    gsap.from(cards, {
        y: 40,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
}

export function animateProductCount(element, count) {
    gsap.from(element, {
        textContent: 0,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => element.textContent = Math.floor(element.textContent),
        onComplete: () => element.textContent = count
    });
}