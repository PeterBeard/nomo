import {choose, roll1D} from './random.js';
import {adjectives, nouns} from './words.js';
import {toTitleCase} from './strings.js';
/*
 *  Variables and functions related to generating names for people
 */

const firstNames = [
    'Alan',
    'Alexander',
    'Angelica',
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
    'Denise',
    'Dorothy',
    'Dougal',
    'Edward',
    'Eleanor',
    'Elliott',
    'Emmanuel',
    'Enid',
    'Evangeline',
    'Francine',
    'Frangelico',
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
    'Narcissa',
    'Nathaniel',
    'Nigel',
    'Norton',
    'Octavia',
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
    'Diggins',
    'Dumpleton',
    'Dumweiner',
    'Flasterstein',
    'Lerpiss',
    'Merz',
    'Pepperdyne',
    'Scroggs',
    'Spreckels',
    'Van der Woops',
];

const suffixes = [
    'balls',
    'barrel',
    'cock',
    'face',
    'fire',
    'foot',
    'fruit',
    'gate',
    'hammer',
    'hands',
    'meister',
    'opoulos',
    'ship',
    'stein',
    'storm',
    'water',
    'wick',
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
    'Saint-',
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
