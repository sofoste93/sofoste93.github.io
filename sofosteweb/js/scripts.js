document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    let darkMode = false;

    darkModeToggle.addEventListener('click', function () {
        darkMode = !darkMode;
        if (darkMode) {
            body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="bi bi-sun"></i>';
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.innerHTML = '<i class="bi bi-moon"></i>';
        }
    });

    // Add event listener to close navbar when inactive
    document.addEventListener('click', function (event) {
        const navbar = document.getElementById('navigationBar');
        const navbarCollapse = document.getElementById('navbarNav');

        if (!navbar.contains(event.target) && !navbarCollapse.contains(event.target)) {
            navbarCollapse.classList.remove('show');
        }
    });

    let countdown = 5;
    let timerInterval = setInterval(function () {
        countdown--;
        document.getElementById('timer').innerHTML = `Switching to dark mode in ${countdown} seconds...`;
        if (countdown === 0) {
            clearInterval(timerInterval);
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="bi bi-sun"></i>';
            document.getElementById('timer').style.display = 'none'; // hide the timer
        }
    }, 1000);
});