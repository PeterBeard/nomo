const firstNames = [
    'Alan',
    'Aurelia',
    'Barbara',
    'Beatrice',
    'Benedict',
    'Bertrand',
    'Beverly',
    'Charlotte',
    'Cletus',
    'Clifford',
    'Dorothy',
    'Dougal',
    'Edward',
    'Eleanor',
    'Elliott',
    'Emmanuel',
    'Furnifold',
    'Gertrude',
    'Harriet',
    'Haskell',
    'Helen',
    'Hyacinth',
    'Jean-Jacques',
    'Jerome',
    'Judith',
    'Julia',
    'Kelvin',
    'Lisa',
    'Margot',
    'Martha',
    'Mavis',
    'Melvin',
    'Nanette',
    'Nathaniel',
    'Nigel',
    'Norton',
    'Oliver',
    'Ramona',
    'Robert',
    'Simon',
    'Stephen',
    'Steve',
    'Timothy',
    'Tobias',
    'Wesley',
    'Zenobia',
    'Zelda',
];
const lastNames = [
    'Borkenstein',
    'Bumpass',
    'Crambert',
    'Danckwerts',
    'Dumpleton',
    'Dumweiner',
    'Flasterstein',
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
    'Bath',
    'Bird',
    'Birthday',
    'Blanket',
    'Bleach',
    'Bludgeon',
    'Broccoli',
    'Bucket',
    'Building',
    'Burger',
    'Caption',
    'Chandelier',
    'Chardonnay',
    'Cheese',
    'Crayon',
    'Cushion',
    'Divorce',
    'Egg',
    'Festival',
    'Friendship',
    'Gargle',
    'Government',
    'Gradient',
    'Hammock',
    'Jellyfish',
    'Lamp',
    'Lighthouse',
    'Loaf',
    'Lumber',
    'Opposite',
    'Pepper',
    'Prose',
    'Quicksand',
    'Rainstorm',
    'Scissor',
    'Shape',
    'Sidetable',
    'Snakes',
    'Sofa',
    'Squeak',
    'Taste',
    'Tomato',
    'Toothpaste',
    'Trains',
    'Trousers',
    'Vest',
    'Volcano',
    'Worm',
    'Weasel',
];
const suffixes = [
    'balls',
    'face',
    'fire',
    'foot',
    'gate',
    'hammer',
    'hands',
    'meister',
    'opoulos',
    'ship',
    'stein',
    'storm',
    'water',
    'winkle',
    'wood',
];
const prefixes = [
    'Ben-',
    'Mc',
    'von ',
    'Ó\'',
];

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
 * Generate a random surname
 */
function generateSurname(allowHyphenation) {
    if (allowHyphenation === undefined) {
        allowHyphenation = true;
    }

    let lastName = choose(lastNames);
    // Should we use a random noun to make up a name or use the one from the list?
    if (Math.random() < 0.9) {
        lastName = choose(nouns);
        // Sometimes we add a suffix to lastName if it's a short noun
        let suffixChance = 1.0 * (lastName.length > 8 ? 0.0 : 5.0 / lastName.length);
        if (Math.random() < suffixChance) {
            // Usually we use a generic suffix
            let suffix = choose(suffixes);
            let lastChar = lastName.charAt(lastName.length - 1);
            if (lastChar === 's') {
                lastName = lastName.substring(0, lastName.length - 1);
                lastChar = lastName.charAt(lastName.length - 1);
            }
            while (lastChar === suffix.charAt(0)) {
                suffix = choose(suffixes);
            }
            lastName += suffix;
        }
        // Prefixes can also be quite good
        if (Math.random() < 0.1) {
            lastName = choose(prefixes) + lastName;
        }
    }
    if (allowHyphenation && Math.random() < 0.1) {
        lastName += '-' + generateSurname(false);
    }
    return lastName;
}

/**
 * Generate a random name and show it on the page
 */
function generateName() {
    let firstChoice = Math.floor(Math.random() * firstNames.length);
    let firstName = firstNames[firstChoice];
    let lastName = generateSurname();
    const nameEl = document.getElementById('name');
    transitionElementText(nameEl, firstName + ' ' + lastName);
}

window.addEventListener('load', function() {
    document.getElementById('generate-button').addEventListener('click', generateName);
    generateName();
});
