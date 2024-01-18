document.addEventListener('DOMContentLoaded', function() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const socialButtons = document.querySelectorAll('.social-media-links a');

    socialButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const staffMembers = document.querySelectorAll('.staff-member');

    staffMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'scale(1.05)';
            member.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });

        member.addEventListener('mouseleave', () => {
            member.style.transform = 'none';
            member.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });
});
