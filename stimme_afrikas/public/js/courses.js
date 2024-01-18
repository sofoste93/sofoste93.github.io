document.addEventListener('DOMContentLoaded', function() {
    // Example: Animate course items on scroll
    window.addEventListener('scroll', function() {
        const courseItems = document.querySelectorAll('.course-item');
        courseItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (itemPosition < screenPosition) {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollAnimation = () => {
        document.querySelectorAll('.course-item, .tutor-profile').forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (itemPosition < screenPosition) {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', scrollAnimation);
});
