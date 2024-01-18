document.addEventListener('DOMContentLoaded', function() {
    const performanceCards = document.querySelectorAll('.performance-card');

    performanceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.03)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'none';
        });
    });
});
