import {choose, roll1D} from './random.js';
import {firstNames} from './name.js';
import {adjectives, animals, comparatives, colors, naturalFeatures, nouns} from './words.js';
import {getOrdinalSuffix, toTitleCase} from './strings.js';

/*
 *  Variables and functions related to generating place names
 */
const cityNouns = [
    'Accent',
    'Accident',
    'Afterthought',
    'Appliance',
    'Bath',
    'Birthday',
    'Blanket',
    'Bleach',
    'Bludgeon',
    'Broccoli',
    'Bucket',
    'Building',
    'Burger',
    'Chandelier',
    'Chardonnay',
    'Cheese',
    'Crayon',
    'Cushion',
    'Echo',
    'Egg',
    'Festival',
    'Friendship',
    'Gargle',
    'Hammock',
    'Jellyfish',
    'Lamp',
    'Lighthouse',
    'Loaf',
    'Market',
    'Opposite',
    'Pepper',
    'Pleasant',
    'Prose',
    'Quicksand',
    'Rainstorm',
    'Sidetable',
    'Sofa',
    'Squeak',
    'Stink',
    'Taste',
    'Tomato',
    'Toothpaste',
    'Trains',
    'Trousers',
    'Vest',
    'Volcano',
    'Water',
    'Weasel',
];
const citySuffixes = [
    'adelphia',
    'apolis',
    'boro',
    'borough',
    'bottom',
    'burg',
    'chester',
    'croft',
    'dale',
    'falls',
    'foot',
    'ford',
    'hill',
    'hole',
    'horn',
    'hurst',
    'land',
    'minster',
    'port',
    'ton',
    'town',
    'vale',
    'ville',
];
const cityTypes = [
    'center',
    'city',
    'crossing',
    'ferry',
    'harbor',
    'heights',
    'junction',
    'manor',
    'park',
    'village',
    'vista',
];
const cardinalDirections = [
    'east',
    'north',
    'south',
    'west',
];
const directions = cardinalDirections.concat([
    'inner',
    'lower',
    'middle',
    'outer',
    'upper',
]);
const placePrefixes = [
    'fort',
    'lake',
    'mount',
    'port',
];
const streetTypes = [
    'avenue',
    'boulevard',
    'crescent',
    'road',
    'street',
    'way',
];
const statePrefixes = cardinalDirections.concat([
    'new',
    'old',
]);
const stateSuffixes = [
    'fornia',
    'klahoma',
    'shire',
    'sota',
    'sylvania',
];

/**
  * Generate a random city name
  */
function generateCity() {
    let cityName = choose(adjectives) + choose(citySuffixes);
    switch(roll1D(12)) {
        case 1:
        case 2:
            cityName = choose(animals) + ' ' + choose(naturalFeatures);
            break;
        case 3:
        case 4:
            let separator = ' ';
            if (roll1D(10) < 2) {
                separator = '';
            }
            cityName = choose(colors) + separator + choose(animals);
            break;
        case 5:
            if (roll1D(2) < 2) {
                cityName = choose(firstNames) + '\'s Hope';
            } else {
                cityName = 'Saint ' + choose(firstNames);
            }
            break;
        case 6:
        case 7:
        case 8:
            if (roll1D(2) === 1) {
                cityName = choose(placePrefixes) + ' ' + choose(cityNouns);
            } else {
                cityName = choose(cityNouns) + ' ' + choose(naturalFeatures);
            }
            if (roll1D(10) < 3) {
                cityName = choose(directions) + ' ' + cityName;
            }
            break;
        case 9:
            if (roll1D(10) < 3) {
                // Add a direction to the city name
                cityName = choose(directions) + ' ' + cityName;
            } else if (roll1D(4) < 3) {
                // Or add a comparative
                cityName = choose(comparatives) + ' ' + cityName;
            }
            break;
        case 10:
        case 11:
            cityName = choose(cityNouns) + ' ' + choose(cityTypes);
            break;
        case 12:
        default:
            cityName = choose(cityNouns) + choose(citySuffixes);
            break;
    }
    return toTitleCase(cityName);
}


/**
  * Generate a word that sounds like a US state
  */
function generateState() {
    let stateName = choose(nouns.concat(adjectives)) + choose(stateSuffixes);
    if (roll1D(4) === 1) {
        stateName = choose(statePrefixes) + ' ' + stateName;
    }
    return toTitleCase(stateName);
}


/**
  * Generate a random street name (e.g. "South Bucket Street")
  */
function generateStreetName() {
    let streetName = choose(nouns.concat(adjectives)) + ' ' + choose(streetTypes);
    if (roll1D(10) < 2) {
        // Use a random number for the street (e.g. 24th st)
        let number = Math.floor(Math.random() * 100);
        streetName = number + getOrdinalSuffix(number) + ' ' + choose(streetTypes);
    }
    if (roll1D(4) === 1) {
        streetName = choose(cardinalDirections) + ' ' + streetName;
    }
    return toTitleCase(streetName);
}


/**
  * Generate a full street address (e.g. 123 Main Street, Anytown, USA 99999)
  */
function generateAddress() {
    const houseNumber = Math.ceil(Math.random() * 100);
    let streetAddress = houseNumber + ' ' + generateStreetName();
    if (roll1D(10) < 4) {
        // This is an apartment
        let apartmentNumber = Math.ceil(Math.random() * 1000) + 100;
        if (roll1D(4) < 3) {
            const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            if (roll1D(4) < 3) {
                apartmentNumber = letter + '' + Math.ceil(Math.random() * 100);
            } else {
                const sep = choose(['', ' ']);
                apartmentNumber = Math.ceil(Math.random() * 100) + sep + letter;
            }
        }
        streetAddress += ' apartment ' + apartmentNumber;
    }
    let city = generateCity();
    let state = generateState();
    let zipCode = Math.floor(Math.random() * 90000) + 10000;
    return [
        toTitleCase(streetAddress),
        city,
        state,
        zipCode,
    ];
}

export {generateAddress};
