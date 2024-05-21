document.getElementById('run-code').addEventListener('click', function () {
    const userCode = document.getElementById('code-input').value;
    try {
        const result = eval(userCode);
        document.getElementById('output').textContent = `Result: ${result}`;
    } catch (error) {
        document.getElementById('output').textContent = `Error: ${error.message}`;
    }
});
