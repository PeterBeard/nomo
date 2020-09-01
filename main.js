/**
  * Choose a random element from the given array
  */
function choose(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}

/**
 * Do a cool transition from an element's current text to some new text
 */
function transitionElementText(element, newText) {
    if (!element.textContent) {
        element.textContent = newText;
    } else {
        // First pad/truncate the existing text to match the length of the new text
        let oldText = element.textContent;
        if (oldText.length > newText.length) {
            oldText = oldText.substring(0, newText.length);
        } else {
            oldText = oldText.padEnd(newText.length);
        }
        element.textContent = oldText;
        // Cycle the letters in the old text until they match
        function cycleLetters(element, newText, totalDelay) {
            const maxDelay = 500;
            let nErrors = 0;
            const currText = element.textContent;
            let rotatedText = '';
            // Rotate any characters that don't match the target string
            for (let charIndex = 0; charIndex < currText.length; charIndex++) {
                let charCode = currText.charCodeAt(charIndex);
                let targetCode = newText.charCodeAt(charIndex);
                // Spaces make for ugly animation
                if (targetCode === 32 || charCode === 32) {
                    charCode = targetCode;
                }
                if (charCode < targetCode) {
                    charCode++;
                    nErrors++;
                } else if (charCode > targetCode) {
                    charCode--;
                    nErrors++;
                }
                rotatedText = rotatedText.concat(String.fromCharCode(charCode));
            }
            element.textContent = rotatedText;
            const delay = Math.min(103 - Math.floor(100 * nErrors / newText.length), 30);
            totalDelay += delay;
            if (element.textContent !== newText && totalDelay < maxDelay) {
                setTimeout(function() {cycleLetters(element, newText, totalDelay)}, delay);
            } else {
                element.textContent = newText;
            }
        }
        cycleLetters(element, newText, 0);
    }
}


/**
  * Generate a new identity
  */
function generateIdentity() {
    const name = generateName();
    const nameEl = document.getElementById('name');
    transitionElementText(nameEl, name);
}

window.addEventListener('load', function() {
    document.getElementById('generate-button').addEventListener('click', generateIdentity);
    generateIdentity();
});
