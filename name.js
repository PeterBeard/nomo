import {choose, chooseWeighted, roll1D} from './random.js';
import {adjectives, nouns, verbs, animals, fruits, foods, bodyParts, naturalFeatures, pluralize, toAgentNoun} from './words.js';
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


/****** Name generator functions ******/
/***
 * Format a noun so it looks like it could be a name
 */
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

/***
 * Score a name that comes in two parts (e.g. "Squash" "Cat" -> "Squashcat") (low scores are better)
 */
function scoreTwoPartName(a, b) {
    let score = 0;
    a = a.toLowerCase();
    b = b.toLowerCase();
    // Alliterative names tend to be pretty good
    if (a.charAt(0) == b.charAt(0)) {
        score -= 1;
    }
    // Names where the first part ends in the same letter the second part starts with aren't so good
    if (a.charAt(a.length - 1) === b.charAt(0)) {
        score += 1;
    }
    return score;
}

/***
 * Pick the best pair of words from two lists using the given scoring function
 */
function chooseBestFromLists(listA, listB, nChoices, scoreFunction) {
    if (scoreFunction === undefined) {
        scoreFunction = scoreTwoPartName;
    }
    if (nChoices === undefined) {
        nChoices = 10;
    }
    const options = [];
    for (let i = 0; i < nChoices; i++) {
        const a = choose(listA);
        const b = choose(listB);
        options.push([scoreFunction(a, b), a, b]);
    }
    // Rank the options and return the best one
    options.sort();
    return [options[0][1], options[0][2]];
}

/***
 * Living thing + body part seems to yield some pretty good names, e.g.
 * - Weaselnose
 * - Dogbottom
 * - Potatoface
 */
function generateNounBodyName() {
    const best = chooseBestFromLists(nouns.concat(animals, foods, fruits), bodyParts);
    return toTitleCase(best[0] + best[1]);
}

/***
 * A single word
 */
function generateFoodName() {
    return nounToName(choose(nouns.concat(adjectives, foods)));
}

/***
 * Verb + living thing/food
 * - Eatsausage
 * - Smellhorse
 */
function generateVerbNounName() {
    const verb = choose(verbs);
    const noun = choose(animals.concat(foods, fruits));
    return toTitleCase(verb + noun);
}

/***
 * Name of a fruit + "fruit"
 * - Orangefruit
 * - Grapefruitfruit
 */
function generateFruitName() {
    return toTitleCase(`${choose(fruits)}fruit`);
}

/***
 * Adjective + body part
 */
function generateAdjectiveBodyPartName() {
    const best = chooseBestFromLists(adjectives, bodyParts, 20);
    return toTitleCase(best[0] + best[1]);
}

/***
 * Generate a name from the list of silly names
 */
function generateNameFromList() {
    return choose(lastNames);
}

/***
 * Generate a name based on a natural feature + a verb
 * - Mountainkicker
 * - Dirtlicker
 * - Treehugger
 */
function generateNatureName() {
    const best = chooseBestFromLists(naturalFeatures, verbs);
    return toTitleCase(best[0] + toAgentNoun(best[1]));
}

/**
 * Generate a random surname
 */
function generateSurname(allowHyphenation) {
    if (allowHyphenation === undefined) {
        allowHyphenation = true;
    }

    // Weight the algorithms and make a random choice of which one to use
    const algorithms = [
        generateNameFromList,
        generateFruitName,
        generateVerbNounName,
        generateNounBodyName,
        generateFoodName,
        generateAdjectiveBodyPartName,
        generateNatureName,
    ];
    const weights = [
        1,
        2,
        2,
        5,
        4,
        6,
        4,
    ];
    const nameGenerator = chooseWeighted(algorithms, weights);
    let lastName = nameGenerator();

    if (allowHyphenation && roll1D(20) === 1) {
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
