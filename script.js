document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.spell-card, .curiosidade-card, .stat-card, .feitico-card, .planta-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

let clickCount = 0;
const title = document.querySelector('header h1');

if (title) {
    title.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            showMagicMessage();
            clickCount = 0;
        }
    });
}

function showMagicMessage() {
    const messages = [
        '✨ "Expecto Patronum!" ✨',
        '🪄 Magia detectada! 🪄',
        '🌟 A agricultura mágica prospera! 🌟',
        '⚡ Você desbloqueou um feitiço secreto! ⚡',
        '🍃 A terra responde à sua magia! 🍃'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.zIndex = '9999';
    sparkle.innerHTML = '✨';
    
    document.body.appendChild(sparkle);
    
    let opacity = 1;
    const interval = setInterval(() => {
        opacity -= 0.05;
        sparkle.style.opacity = opacity;
        sparkle.style.transform = `translateY(-${(1-opacity) * 50}px)`;
        
        if (opacity <= 0) {
            clearInterval(interval);
            sparkle.remove();
        }
    }, 50);
}

document.addEventListener('click', (e) => {
    if (e.target.closest('[class*="card"]')) {
        createSparkle(e.clientX, e.clientY);
    }
});

window.addEventListener('load', () => {
    console.log('🌾 Bem-vindo ao site de Agricultura Mágica!');
    console.log('✨ Clique 5 vezes no título para desbloquear uma mensagem especial!');
});

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background: rgba(212, 175, 55, 0.3);
        border-bottom: 3px solid var(--color-accent);
    }
`;
document.head.appendChild(style);