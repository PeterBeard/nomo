import {choose, roll1D} from './random.js';
import {adjectives, nouns, verbs, animals, fruits, foods, bodyParts, pluralize} from './words.js';
import {toTitleCase} from './strings.js';
/*
 *  Variables and functions related to generating names for people
 */

const firstNames = [
    'Alan',
    'Albany',
    'Alexander',
    'Angelica',
    'Ansel',
    'Anthea',
    'Aurelia',
    'Barbara',
    'Beatrice',
    'Benedict',
    'Bengt',
    'Bertrand',
    'Beverly',
    'Brenda',
    'Brick',
    'Cameron',
    'Charlotte',
    'Christine',
    'Clarence',
    'Clarissa',
    'Cletus',
    'Clifford',
    'Cornelius',
    'Cuthbert',
    'Dagmar',
    'Dean',
    'Demetria',
    'Denise',
    'Dorothy',
    'Dougal',
    'Edward',
    'Eleanor',
    'Elliott',
    'Emmanuel',
    'Enid',
    'Ernestine',
    'Esmerelda',
    'Eudora',
    'Eunice',
    'Eustace',
    'Evangeline',
    'Francine',
    'Frangelico',
    'Furnifold',
    'Gangulphus',
    'Georgette',
    'Gertrude',
    'Graham',
    'Harriet',
    'Haskell',
    'Helen',
    'Henrietta',
    'Heywood',
    'Hyacinth',
    'Janice',
    'Jean-Jacques',
    'Jerome',
    'Judith',
    'Julia',
    'Kelvin',
    'Lemuel',
    'Leonard',
    'Leopold',
    'Lionel',
    'Lisa',
    'Lucien',
    'Lucius',
    'Margot',
    'Marmaduke',
    'Martha',
    'Mavis',
    'Maxine',
    'Melba',
    'Melvin',
    'Milton',
    'Miranda',
    'Nanette',
    'Narcissa',
    'Nathaniel',
    'Nigel',
    'Norton',
    'Octavia',
    'Oliver',
    'Pandora',
    'Partario',
    'Peggy',
    'Pierpont',
    'Pierre',
    'Quentin',
    'Quincy',
    'Ramona',
    'Ranier',
    'Renata',
    'Robert',
    'Rupert',
    'Sebastian',
    'Shelley',
    'Sigmund',
    'Simon',
    'Skidmore',
    'Stelvio',
    'Stephen',
    'Steve',
    'Tarquin',
    'Timothy',
    'Tobias',
    'Ulysses',
    'Vivica',
    'Vivian',
    'Wesley',
    'Woody',
    'Zebulon',
    'Zelda',
    'Zenobia',
];
const lastNames = [
    'Bibbleford',
    'Bogler',
    'Bogman',
    'Borkenstein',
    'Bumpass',
    'Chickums',
    'Crambert',
    'Danckwerts',
    'Delgato',
    'Diggins',
    'Dumpleton',
    'Dumweiner',
    'Flasterstein',
    'Fontblanc',
    'Leeler',
    'Lerpiss',
    'Merz',
    'Muncey',
    'Pepperdyne',
    'Scroggs',
    'Spreckels',
    'Torkelson',
    'Urquhart',
    'Van der Woops',
    'Zlatko',
];

const suffixes = [
    'balls',
    'barrel',
    'bottom',
    'bridge',
    'bucket',
    'burger',
    'cock',
    'face',
    'fire',
    'foot',
    'fruit',
    'garden',
    'gate',
    'hammer',
    'hands',
    'man',
    'master',
    'meister',
    'opoulos',
    'ship',
    'stein',
    'storm',
    'water',
    'wick',
    'wig',
    'winkle',
    'winner',
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
    'mouth',
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
const lowerPrefixes = [
    'Fitz',
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
    function nounToName(noun) {
        let lastName = toTitleCase(noun);
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
        } else if(roll1D(10) === 1) {
            lastName = toTitleCase(choose(lowerPrefixes) + lastName);
        }
        return lastName;
    }
    if (allowHyphenation === undefined) {
        allowHyphenation = true;
    }

    let lastName = choose(lastNames);
    // Should we use a random noun to make up a name or use the one from the list?
    switch(roll1D(12)) {
        case 1:
        case 2:
        case 3:
        case 4:
            lastName = toTitleCase(choose(nouns.concat(animals, foods, fruits)) + choose(bodyParts));
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            lastName = nounToName(choose(nouns.concat(adjectives, foods)));
            break;
        case 10:
            lastName = toTitleCase(choose(verbs) + choose(animals.concat(foods.concat(fruits))));
            break;
        case 11:
            lastName = toTitleCase(`${choose(fruits)}fruit`);
            break;
        case 12:
        default:
            break;
    }
    if (allowHyphenation && roll1D(10) === 1) {
        lastName = `${lastName}-${generateSurname(false)}`;
    }
    return lastName;
}

/**
 * Generate a random name and show it on the page
 */
function generateName() {
    let lastName = generateSurname();
    return `${choose(firstNames)} ${lastName}`;
}

export {firstNames, generateName};
