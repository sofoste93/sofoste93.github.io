document.getElementById('passwordForm').addEventListener('submit', function (event) {
    // Prevent the form from submitting
    event.preventDefault();

    // The correct password
    var correctPassword = 'Dreso2022';

    // The entered password
    var enteredPassword = document.getElementById('passwordInput').value;

    // Check if the entered password matches the correct password
    if (enteredPassword === correctPassword) {
        // If the password is correct, hide the login form and show the actual content
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        // If the password is incorrect, clear the password field and focus it for re-entry
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordInput').focus();
        alert('Incorrect password. Please try again.');
    }
});
