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
 * Generate a random name and show it on the page
 */
function generateName() {
    const firstNames = [
        'Aurelia',
        'Barbara',
        'Beatrice',
        'Benedict',
        'Bertrand',
        'Charlotte',
        'Clifford',
        'Eleanor',
        'Elliott',
        'Furnifold',
        'Harriet',
        'Haskell',
        'Helen',
        'Jerome',
        'Judith',
        'Julia',
        'Kelvin',
        'Lisa',
        'Margot',
        'Mavis',
        'Melvin',
        'Nanette',
        'Norton',
        'Oliver',
        'Ramona',
        'Robert',
        'Simon',
        'Steve',
        'Tobias',
        'Zenobia',
    ];
    const lastNames = [
        'Birdwater',
        'Borkenstein',
        'Bumpass',
        'Burgermeister',
        'Cheesewinkle',
        'Crambert',
        'Danckwerts',
        'Dumpleton',
        'Dumweiner',
        'Flasterstein',
        'Gargleman',
        'Lerpiss',
        'Pepperdyne',
        'Spreckels',
        'Van der Woops',
    ];
    const nouns = [
        'Accent',
        'Accident',
        'Afterthought',
        'Appliance',
        'Basin',
        'Bird',
        'Blanket',
        'Bleach',
        'Broccoli',
        'Building',
        'Caption',
        'Chandelier',
        'Crayon',
        'Cushion',
        'Divorce',
        'Egg',
        'Festival',
        'Gradient',
        'Hammock',
        'Lighthouse',
        'Loaf',
        'Lumber',
        'Number',
        'Opposite',
        'Prose',
        'Quicksand',
        'Rainstorm',
        'Shape',
        'Sidetable',
        'Snakes',
        'Sofa',
        'Squeak',
        'Taste',
        'Tomatoes',
        'Toothpaste',
        'Trains',
        'Trousers',
        'Vest',
        'Volcano',
    ];
    let firstChoice = Math.floor(Math.random() * firstNames.length);
    let lastChoice = Math.floor(Math.random() * lastNames.length);
    let firstName = firstNames[firstChoice];
    let lastName = lastNames[lastChoice];

    // Decide whether or not to use a random noun for one of the names
    if (Math.random() < 0.9) {
        // Prefer to change the last name
        if (Math.random() < 0.8) {
            lastChoice = Math.floor(Math.random() * nouns.length);
            lastName = nouns[lastChoice];
        } else {
            firstChoice = Math.floor(Math.random() * nouns.length);
            firstName = nouns[firstChoice];
        }
    }
    const nameEl = document.getElementById('name');
    transitionElementText(nameEl, firstName + ' ' + lastName);
}

window.addEventListener('load', function() {
    document.getElementById('generate-button').addEventListener('click', generateName);
    generateName();
});
