/*
 *  Variables and functions related to generating place names
 */

const citySuffixes = [
    'borough',
    'bottom',
    'chester',
    'falls',
    'ford',
    'hill',
    'hole',
    'land',
    'minster',
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
const prepositions = [
    'in the',
    'on the',
    'on',
    'over',
    'upon',
];
const rivers = [
    'avon',
    'mimms',
    'rinse',
    'wet',
];
const placePrefixes = [
    'lake',
    'mount',
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
    if (Math.random() < 0.3) {
        let separator = ' ';
        if (Math.random() < 0.1) {
            separator = '';
        }
        cityName = choose(colors) + separator + choose(animals);
    } else if (Math.random() < 0.5) {
        cityName = choose(nouns) + choose(citySuffixes);
        if (Math.random() < 0.4) {
            cityName += ' ' + choose(prepositions) + ' ' + choose(rivers);
        }
    } else if (Math.random() < 0.7) {
        cityName = choose(placePrefixes) + ' ' + choose(nouns);
        if (Math.random() < 0.2) {
            cityName = choose(directions) + ' ' + cityName;
        }
    } else if (Math.random() < 0.8) {
        cityName = 'Saint ' + choose(firstNames);
    } else {
        if (Math.random() < 0.2) {
            // Add a direction to the city name
            cityName = choose(directions) + ' ' + cityName;
        } else if (Math.random() < 0.5) {
            // Or add a comparative
            cityName = choose(comparatives) + ' ' + cityName;
        }
    }
    return toTitleCase(cityName);
}


/**
  * Generate a random street name (e.g. "South Bucket Street")
  */
function generateStreetName() {
    let streetName = choose(nouns) + ' ' + choose(streetTypes);
    if (Math.random() < 0.2) {
        // Use a random number for the street (e.g. 24th st)
        let number = Math.floor(Math.random() * 100);
        streetName = number + getOrdinalSuffix(number) + ' ' + choose(streetTypes);
    }
    if (Math.random() < 0.25) {
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
    if (Math.random() < 0.3) {
        // This is an apartment
        let apartmentNumber = Math.ceil(Math.random() * 1000) + 100;
        if (Math.random() < 0.5) {
            const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            if (Math.random() < 0.5) {
                apartmentNumber = letter + '' + Math.ceil(Math.random() * 100);
            } else {
                const sep = choose(['', ' ']);
                apartmentNumber = Math.ceil(Math.random() * 100) + sep + letter;
            }
        }
        streetAddress += ' apartment ' + apartmentNumber;
    }
    let city = generateCity();
    return [
        toTitleCase(streetAddress),
        city,
        choose(['CA', 'MN', 'MI']),
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
