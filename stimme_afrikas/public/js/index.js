document.addEventListener('DOMContentLoaded', function() {
    // Function to handle any dynamic changes on the page
    function enhanceWebsite() {
        // Example: Animate navbar on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // More dynamic features can be added here
    }

    // Initialize the enhancements when the page loads
    enhanceWebsite();
});
