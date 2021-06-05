import {choose, roll1D} from './random.js';
import {firstNames} from './name.js';
import {adjectives, animals, comparatives, colors, naturalFeatures, nouns, trees, foods} from './words.js';
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
    'view',
    'ville',
    'wood',
    'worth',
];
const cityTypes = [
    'center',
    'city',
    'corner',
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
const unitTypes = [
    'apartment',
    'building',
    'living space',
    'unit',
];
const streetTypes = [
    'avenue',
    'boulevard',
    'circle',
    'crescent',
    'lane',
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
const usStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
];


/**
 * An object containing fields representing a street address
 */
class Address {
    /*
     * Create a new address - all fields will be null if no arguments are passed in
     */
    constructor(houseNumber, street, unitType, unit, city, state, zip) {
        if (arguments.length > 0) {
            this.houseNumber = houseNumber;
            this.street = street;
            this.unitType = unitType;
            this.unit = unit;
            this.city = city;
            this.state = state;
            this.zip = zip;
        } else {
            this.houseNumber = null;
            this.street = null;
            this.unitType = null;
            this.unit = null;
            this.city = null;
            this.state = null;
            this.zip = null;
        }
    }

    /**
     * Format the first line of this address
     */
    streetAddress() {
        let addressString = this.houseNumber + ' ' + this.street;
        if (this.unitType && this.unit) {
            addressString += ' ' + toTitleCase(this.unitType) + ' ' + this.unit;
        }
        return addressString;
    }

    /**
     * Put together a string representing this address
     */
    toString(oneline) {
        // Default is to create a multi-line address
        let separator = '\n';
        if (oneline === true) {
            separator = ', ';
        }
        let line1 = this.streetAddress();
        let line2 = this.city + ', ' + this.state + ' ' + this.zip;

        return line1 + separator + line2;
    }
}

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
    // Usually the best way to generate a state name is to modify an existing one
    let stateName = choose(usStates);
    let prefix = null;
    if (stateName.indexOf(' ') >= 0 && stateName.indexOf('R') !== 0) {
        const parts = stateName.split(' ');
        prefix = parts[0];
        stateName = parts[1];
    }
    const vowels = 'AEIOU';
    let consonant = choose(['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y', 'Z'].filter(c => stateName.indexOf(c) !== 0));
    if (consonant === 'Q') {
        consonant = 'Qu';
    }
    if (vowels.indexOf(stateName.charAt(0)) >= 0) {
        // If the state name starts with a vowel, prepend the consonant
        stateName = consonant + stateName;
    } else {
        // Otherwise, Replace the initial consonant with the new one
        stateName = consonant + stateName.substr(1);
    }
    if (prefix) {
        stateName = prefix + ' ' + stateName;
    } else if (roll1D(10) === 1) {
        // Add a prefix
        stateName = choose(statePrefixes) + ' ' + stateName;
    }
    return toTitleCase(stateName);
}


/**
  * Generate a random street name (e.g. "South Bucket Street")
  */
function generateStreetName() {
    let streetName = choose(nouns.concat(adjectives, foods));
    const option = roll1D(10);
    if (option < 2) {
        // Use a random number for the street (e.g. 24th st)
        let number = Math.floor(Math.random() * 100);
        if (roll1D(4) < 4) {
            // The most common numbers are 2 through 10
            number = 2 + Math.floor(Math.random() * 8);
        }
        streetName = number + getOrdinalSuffix(number);
    } else if (option < 4) {
        // Name this street after a person
        streetName = choose(firstNames);
    } else if (option < 5) {
        // Use a natural feature for this street
        streetName = choose(naturalFeatures);
    } else if (option < 9) {
        // Streets named after trees are *very* common
        streetName = choose(trees);
    } else {
        // Stick with a random noun/adjective
    }
    streetName = streetName + ' ' + choose(streetTypes);
    if (roll1D(4) === 1) {
        // Add a direction to the street name
        if (roll1D(2) === 1) {
            streetName = choose(cardinalDirections) + ' ' + streetName;
        } else {
            streetName = streetName + ' ' + choose(cardinalDirections);
        }
    }
    return toTitleCase(streetName);
}


/**
  * Generate a full street address (e.g. 123 Main Street, Anytown, USA 99999)
  */
function generateAddress() {
    const houseNumber = Math.ceil(Math.random() * 100);
    const streetName = generateStreetName();
    let unitType = null;
    let apartmentNumber = null;
    if (roll1D(10) < 4) {
        // This is an apartment
        // But what kind of apartment?
        unitType = choose(unitTypes);
        apartmentNumber = Math.ceil(Math.random() * 1000) + 100;
        if (roll1D(4) < 3) {
            const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            if (roll1D(4) < 3) {
                apartmentNumber = letter + '' + Math.ceil(Math.random() * 100);
            } else {
                const sep = choose(['', ' ']);
                apartmentNumber = Math.ceil(Math.random() * 100) + sep + letter;
            }
        }
    }
    let city = generateCity();
    let state = generateState();
    let zipCode = Math.floor(Math.random() * 90000) + 10000;
    return new Address(
        houseNumber,
        streetName,
        unitType,
        apartmentNumber,
        city,
        state,
        zipCode
    );
}

export {generateAddress};
