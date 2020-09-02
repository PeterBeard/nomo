/*
 *  Variables and functions related to generating place names
 */

const citySuffixes = [
    'borough',
    'bottom',
    'burg',
    'chester',
    'falls',
    'ford',
    'hill',
    'hole',
    'land',
    'minster',
    'town',
    'vale',
    'ville',
];
const comparatives = [
    'greater',
    'inner',
    'lesser',
    'outer',
];
const adjectives = [
    'big',
    'little',
    'nice',
    'sad',
    'small',
    'tiny',
    'great',
];
const colors = [
    'blue',
    'cyan',
    'green',
    'mauve',
    'orange',
    'puce',
    'purple',
    'red',
    'teal',
    'violet',
    'yellow',
];
const animals = [
    'bear',
    'beaver',
    'dog',
    'fox',
    'goose',
    'possum',
    'turkey',
    'weasel',
];
const cardinalDirections = [
    'east',
    'north',
    'south',
    'west',
];
const directions = cardinalDirections.concat([
    'lower',
    'middle',
    'upper',
]);
const placePrefixes = [
    'lake',
    'mount',
];
const placeSuffixes = [
    'bay',
    'hill',
    'meadow',
    'mountain',
    'point',
    'rock',
    'valley',
];
const streetTypes = [
    'avenue',
    'boulevard',
    'road',
    'street',
    'way',
];

/**
  * Generate a random city name
  */
function generateCity() {
    let cityName = choose(adjectives) + choose(citySuffixes);
    switch(roll1D(10)) {
        case 1:
            cityName = choose(animals) + ' ' + choose(placeSuffixes);
            break;
        case 2:
        case 3:
            let separator = ' ';
            if (roll1D(10) < 2) {
                separator = '';
            }
            cityName = choose(colors) + separator + choose(animals);
            break;
        case 4:
        case 5:
            cityName = 'Saint ' + choose(firstNames);
            break;
        case 6:
        case 7:
        case 8:
            if (roll1D(2) === 1) {
                cityName = choose(placePrefixes) + ' ' + choose(nouns);
            } else {
                cityName = choose(nouns) + ' ' + choose(placeSuffixes);
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
        default:
            cityName = choose(nouns) + choose(citySuffixes);
            break;
    }
    return toTitleCase(cityName);
}


/**
  * Generate a random US state abbreviation
  */
function generateState() {
    let abbreviation = String.fromCharCode(Math.random() * 26 + 65) + String.fromCharCode(Math.random() * 26 + 65);
    return abbreviation.toUpperCase();
}


/**
  * Generate a random street name (e.g. "South Bucket Street")
  */
function generateStreetName() {
    let streetName = choose(nouns) + ' ' + choose(streetTypes);
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

/**
  * Abbreviate the given address string (e.g. "14 Some Street Apartment 441" -> "13 Some St. Apt. 441")
  */
function abbreviateAddress(address) {
    const replacements = [
        [/\bApartment\b/, 'Apt'],
        [/\bAvenue\b/, 'Ave'],
        [/\bBoulevard\b/, 'Blvd'],
        [/\bEast\b/, 'E'],
        [/\bNorth\b/, 'N'],
        [/\bRoad\b/, 'Rd'],
        [/\bSouth\b/, 'S'],
        [/\bStreet\b/, 'St'],
        [/\bWest\b/, 'W'],
    ];
    for (const repl of replacements) {
        address = address.replace(
            repl[0],
            repl[1] + '.',
        );
    }
    return address;
}
