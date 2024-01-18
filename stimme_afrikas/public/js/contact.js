document.addEventListener('DOMContentLoaded', function() {
    const staffProfiles = document.querySelectorAll('.staff-member, .staff-member-contact');
    const donationButton = document.querySelector('.donation-section .btn');

    staffProfiles.forEach(profile => {
        profile.addEventListener('mouseenter', () => {
            profile.style.transform = 'scale(1.05)';
            profile.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });

        profile.addEventListener('mouseleave', () => {
            profile.style.transform = 'none';
            profile.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });

    donationButton.addEventListener('mouseover', () => {
        donationButton.style.transform = 'scale(1.1)';
    });

    donationButton.addEventListener('mouseout', () => {
        donationButton.style.transform = 'none';
    });
});
