/*
 *  Variables and functions related to generating names for people
 */

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
    'Pleasant',
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
    return firstName + ' ' + lastName;
}
