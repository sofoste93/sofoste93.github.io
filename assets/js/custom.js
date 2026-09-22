document.documentElement.classList.add('js');

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, revealObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}

const nav = document.querySelector('.site-nav');
if (nav) {
    const setNavState = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    setNavState();
    window.addEventListener('scroll', setNavState, { passive: true });

    const toggle = nav.querySelector('.navbar-toggler');
    const menu = nav.querySelector('.navbar-collapse');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('show');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
        menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
            menu.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
        }));
    }
}
