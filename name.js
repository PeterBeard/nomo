import {choose, roll1D} from './random.js';
import {adjectives, nouns} from './words.js';
import {toTitleCase} from './strings.js';
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
    'Clarissa',
    'Cletus',
    'Clifford',
    'Dorothy',
    'Dougal',
    'Edward',
    'Eleanor',
    'Elliott',
    'Emmanuel',
    'Evangeline',
    'Furnifold',
    'Gertrude',
    'Harriet',
    'Haskell',
    'Helen',
    'Heywood',
    'Hyacinth',
    'Jean-Jacques',
    'Jerome',
    'Judith',
    'Julia',
    'Kelvin',
    'Lionel',
    'Lisa',
    'Margot',
    'Martha',
    'Mavis',
    'Melba',
    'Melvin',
    'Nanette',
    'Nathaniel',
    'Nigel',
    'Norton',
    'Oliver',
    'Ramona',
    'Renata',
    'Robert',
    'Rupert',
    'Shelley',
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
    /* added from Rachel's list */
    'bell',
    'blaze',
    'blitz',
    'blush',
    'bolt',
    'brother',
    'cloud',
    'crow',
    'dance',
    'dancer',
    'drop',
    'dusk',
    'fang',
    'fields',
    'flame',
    'fly',
    'fox',
    'glass',
    'haven',
    'haven',
    'heart',
    'husband',
    'jazz',
    'kiss',
    'mint',
    'mist',
    'moss',
    'quake',
    'quest',
    'rock',
    'rose',
    'sage',
    'sage',
    'shine',
    'shy',
    'sister',
    'sky',
    'smoke',
    'snow',
    'song',
    'sound',
    'star',
    'stone',
    'thorn',
    'tooth',
    'valley',
    'whisper',
    'wife',
    'willow',
    'wind',
    'wing',
    'wish',
    'wolf',
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
    switch(roll1D(10)) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            lastName = toTitleCase(choose(nouns.concat(adjectives)));
            // Sometimes we add a suffix to lastName if it's short
            let suffixChance = 1.0 * (lastName.length > 10 ? 0.0 : 5.0 / lastName.length);
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
            if (roll1D(10) === 1) {
                lastName = choose(prefixes) + lastName;
            }
            break;
        case 10:
        default:
            break;
    }
    if (allowHyphenation && roll1D(10) === 1) {
        lastName += '-' + generateSurname(false);
    }
    return lastName;
}

/**
 * Generate a random name and show it on the page
 */
function generateName() {
    let lastName = generateSurname();
    return choose(firstNames) + ' ' + lastName;
}

export {firstNames, generateName};
