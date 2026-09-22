const challenges = [
    {
        title: 'The First Variable',
        prompt: 'Create a variable named hero with the value "Sofoste", then return hero.',
        starter: 'const hero = "Sofoste";\nhero;',
        validate: (result) => result === 'Sofoste'
    },
    {
        title: 'The Number Gate',
        prompt: 'Use JavaScript to calculate 7 × 6. Your final expression must return the answer.',
        starter: '7 * 6;',
        validate: (result) => result === 42
    },
    {
        title: 'The Array Path',
        prompt: 'Return the second item from the planets array.',
        starter: 'const planets = ["Mercury", "Venus", "Earth"];\nplanets[1];',
        validate: (result) => result === 'Venus'
    }
];

const story = document.getElementById('story');
const progress = document.getElementById('progress');
const input = document.getElementById('code-input');
const output = document.getElementById('output');
const runButton = document.getElementById('run-code');
const nextButton = document.getElementById('next-challenge');
let currentChallenge = 0;

function renderChallenge() {
    const challenge = challenges[currentChallenge];
    progress.textContent = 'Challenge ' + (currentChallenge + 1) + ' of ' + challenges.length;
    story.replaceChildren();
    const heading = document.createElement('h2');
    heading.textContent = challenge.title;
    const description = document.createElement('p');
    description.textContent = challenge.prompt;
    story.append(heading, description);
    input.value = challenge.starter;
    output.textContent = '';
    output.className = '';
    nextButton.disabled = true;
    nextButton.textContent = currentChallenge === challenges.length - 1 ? 'Finish quest' : 'Next challenge';
}

runButton.addEventListener('click', () => {
    try {
        const result = eval(input.value);
        const passed = challenges[currentChallenge].validate(result);
        output.textContent = passed
            ? 'Correct! Result: ' + String(result)
            : 'Not quite. Your code returned ' + String(result) + ' — try again.';
        output.className = passed ? 'success' : 'try-again';
        nextButton.disabled = !passed;
    } catch (error) {
        output.textContent = 'JavaScript error: ' + error.message;
        output.className = 'error';
        nextButton.disabled = true;
    }
});

nextButton.addEventListener('click', () => {
    if (currentChallenge < challenges.length - 1) {
        currentChallenge += 1;
        renderChallenge();
        input.focus();
        return;
    }

    story.replaceChildren();
    const heading = document.createElement('h2');
    heading.textContent = 'Quest complete!';
    const description = document.createElement('p');
    description.textContent = 'You solved every challenge. Keep experimenting and building.';
    story.append(heading, description);
    progress.textContent = '3 of 3 challenges complete';
    input.hidden = true;
    runButton.hidden = true;
    nextButton.hidden = true;
    output.textContent = 'Adventure completed ✓';
    output.className = 'success';
});

renderChallenge();
