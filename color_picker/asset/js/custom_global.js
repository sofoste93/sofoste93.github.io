/** custom_global.js*/
const colorPicker = document.getElementById('colorPicker');
const displayColor = document.getElementById('displayColor');

function addColorToHistory(color) {
    const colorDiv = document.createElement('div');
    colorDiv.style.backgroundColor = color;
    colorDiv.className = 'color-history-item';
    colorDiv.addEventListener('click', () => {
        displayColor.style.backgroundColor = color;
        updateColorInfo(color);
    });
    document.getElementById('colorHistory').appendChild(colorDiv);
}

// Reusable function to copy any text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`Copied to clipboard: ${text}`);
    }, (err) => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy, please try again.');
    });
}

/*function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy'); // deprecation
    textArea.remove();
    alert(`Copied to clipboard: ${text}`);
}*/

function updateColorInfo(color) {
    const hexValueElement = document.getElementById('hexValue');
    const rgbValueElement = document.getElementById('rgbValue');
    const hslValueElement = document.getElementById('hslValue');

    hexValueElement.textContent = `HEX: ${color}`;
    const rgb = hexToRgb(color);
    rgbValueElement.textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hslValueElement.textContent = `HSL: ${hsl.h}, ${hsl.s}%, ${hsl.l}%`;

    // Set up copy to clipboard on click for each color code element
    [hexValueElement, rgbValueElement, hslValueElement].forEach(el => {
        el.onclick = () => copyToClipboard(el.textContent.split(': ')[1]);
    });
}

colorPicker.addEventListener('input', function () {
    const chosenColor = colorPicker.value;
    displayColor.style.backgroundColor = chosenColor;
    updateColorInfo(chosenColor);
    addColorToHistory(chosenColor);
});

// Helper functions to convert HEX to RGB and RGB to HSL
function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];

        // 6 digits
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }

    return { r: +r, g: +g, b: +b };
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}