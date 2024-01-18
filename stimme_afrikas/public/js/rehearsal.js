document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const cards = document.querySelectorAll('.calendar .card');
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            if (cardPosition < screenPosition) {
                card.classList.add('card-animation');
            }
        });
    });
});
