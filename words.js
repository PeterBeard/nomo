const adjectives = [
    'big',
    'bland',
    'clumpy',
    'creepy',
    'deep',
    'early',
    'future',
    'great',
    'grim',
    'hasty',
    'late',
    'little',
    'nice',
    'old',
    'quick',
    'right',
    'sad',
    'saucy',
    'slippery',
    'small',
    'strong',
    'tiny',
    'vile',
    'weird',
    'wet',
    'wrong',
    /* added from Rachel's list */
    'gentle',
    'lone',
    'pale',
    'sweet',
];
const comparatives = [
    'greater',
    'inner',
    'lesser',
    'outer',
];
const colors = [
    'amber',
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
    'bird',
    'buffalo',
    'dog',
    'elk',
    'fox',
    'goose',
    'hedgehog',
    'monkey',
    'moose',
    'owl',
    'pony',
    'possum',
    'turkey',
    'weasel',
    'worm',
];
const naturalFeatures = [
    'bay',
    'bayou',
    'beach',
    'bluff',
    'canyon',
    'creek',
    'ditch',
    'forest',
    'gap',
    'grove',
    'hill',
    'meadow',
    'mountain',
    'plain',
    'point',
    'prairie',
    'rapids',
    'river',
    'rock',
    'springs',
    'sunrise',
    'sunset',
    'swamp',
    'tree',
    'valley',
    'woods',
];
const trees = [
    'aspen',
    'birch',
    'cedar',
    'cherry',
    'cypress',
    'elm',
    'larch',
    'maple',
    'oak',
    'pine',
    'poplar',
    'spruce',
    'walnut',
];
const vegetables = [
    'bean',
    'beet',
    'broccoli',
    'cabbage',
    'carrot',
    'cauliflower',
    'corn',
    'cucumber',
    'eggplant',
    'garlic',
    'leek',
    'lettuce',
    'onion',
    'parsnip',
    'pea',
    'potato',
    'pumpkin',
    'radish',
    'squash',
    'tomato', // Yes, yes it's technically a berry but come on
    'turnip',
    'yam',
    'zucchini',
];
const fruits = [
    'apple',
    'banana',
    'blueberry',
    'cranberry',
    'gooseberry',
    'grape',
    'grapefruit',
    'guava',
    'kiwi',
    'lemon',
    'lime',
    'orange',
    'peach',
    'pineapple',
    'pomegranate',
    'raspberry',
    'strawberry',
    'watermelon',
];
const foods = [
    'biscuit',
    'burger',
    'cheese',
    'egg',
    'ham',
    'honey',
    'pickle',
].concat(vegetables, fruits);
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
    'Boat',
    'Bongo',
    'Bucket',
    'Building',
    'Candle',
    'Caption',
    'Chandelier',
    'Chardonnay',
    'Compliance',
    'Crayon',
    'Cushion',
    'Divorce',
    'Dripp',
    'Expedition',
    'Feather',
    'Festival',
    'Flesh',
    'Friendship',
    'Gargle',
    'Government',
    'Gradient',
    'Hammock',
    'Heritage',
    'Hickory',
    'Jellyfish',
    'Lamp',
    'Lampshade',
    'Lighthouse',
    'Loaf',
    'Lumber',
    'Lump',
    'Opposite',
    'Passion',
    'Pepper',
    'Pleasant',
    'Prose',
    'Quicksand',
    'Rainstorm',
    'Sand',
    'Scissor',
    'Shape',
    'Sidetable',
    'Snakes',
    'Sofa',
    'Squeak',
    'Stink',
    'Surprise',
    'Taste',
    'Toothpaste',
    'Trains',
    'Trousers',
    'Vest',
    'Volcano',
    'Worm',
    'Weasel',
    /* nouns added from Rachel's list */
    'Autumn',
    'Berry',
    'Bird',
    'Day',
    'Dragon',
    'Dream',
    'Evening',
    'Free',
    'Frost',
    'Humble',
    'Leather',
    'Meadow',
    'Moon',
    'Morning',
    'Night',
    'Ocean',
    'Rain',
    'Salt',
    'Shadow',
    'Spark',
    'Spider',
    'Spring',
    'Sugar',
    'Summer',
    'Velvet',
    'Winter',
    'Witch',
    'Wonder',
];
const verbs = [
    'drink',
    'give',
    'hold',
    'kick',
    'make',
    'melt',
    'taste',
];

// Industries
const industries = [
    'Accommodation',
    'Agriculture',
    'Apparel',
    'Appliance',
    'Art',
    'Beverage',
    'Big Data',
    'Broadcasting',
    'Commodities',
    'Computer',
    'Construction',
    'Credit',
    'Data Processing',
    'Education',
    'Electronics',
    'Entertainment',
    'Film',
    'Finance',
    'Fishing',
    'Food',
    'Forestry',
    'Furniture',
    'Gambling',
    'Health',
    'Historical Sites',
    'Information Services',
    'Insurance',
    'Internet',
    'Laundry',
    'Logging',
    'Machinery',
    'Maintenance',
    'Management',
    'Manufacturing',
    'Mining',
    'Money',
    'Motion Picture',
    'Motor Vehicle',
    'Museums',
    'Nursing',
    'Oil and Gas',
    'Performing Arts',
    'Petrochemical',
    'Plastics',
    'Printing',
    'Publishing',
    'Real Estate',
    'Recreation',
    'Religion',
    'Rental and Leasing',
    'Retail',
    'Robotics',
    'Science',
    'Securities',
    'Sightseeing',
    'Social Media',
    'Sound Recording',
    'Sporting Goods',
    'Telecommunications',
    'Textile',
    'Theme Parks',
    'Transit',
    'Transportation',
    'Waste Management',
    'Water',
];


/*
Add the given suffix to the given word, matching case
*/
function addSuffix(word, suffix) {
    const lastChar = word.charAt(word.length - 1);
    if (lastChar.toUpperCase() === lastChar) {
        return word + suffix.toUpperCase();
    } else {
        return word + suffix.toLowerCase();
    }
}


/*
Pluralize the given word
*/
function pluralize(word) {
    const irregularNouns = {
        'belief': 'beliefs',
        'bus': 'buses',
        'chef': 'chefs',
        'chief': 'chiefs',
        'child': 'children',
        'foot': 'feet',
        'goose': 'geese',
        'halo': 'halos',
        'man': 'men',
        'mouse': 'mice',
        'ox': 'oxen',
        'person': 'people',
        'photo': 'photos',
        'piano': 'pianos',
        'roof': 'roofs',
        'tooth': 'teeth',
        'woman': 'women',
    };
    const unchangedNouns = [
        'deer',
        'fish',
        'series',
        'sheep',
        'species',
    ];
    const vowels = 'aeiou';
    const lowerWord = word.toLowerCase();
    if (unchangedNouns.indexOf(lowerWord) !== -1) {
        // Nouns that are the same for singular and plural
        return word;
    } else if (irregularNouns.hasOwnProperty(word.toLowerCase())) {
        // Irregular plurals
        return irregularNouns[lowerWord];
    } else if (lowerWord.endsWith('s') || lowerWord.endsWith('sh') || lowerWord.endsWith('ch') || lowerWord.endsWith('x') || lowerWord.endsWith('z')) {
        if (vowels.indexOf(lowerWord.charAt(word.length - 2)) !== -1) {
            if (lowerWord.endsWith('s')) {
                // "gas" -> "gasses", "bus" -> "busses"
                return addSuffix(word, 'ses');
            } else if (lowerWord.endsWith('z')) {
                // "fez" -> "fezzes"
                return addSuffix(word, 'zes');
            } else {
                // "fox" -> "foxes"
                return addSuffix(word, 'es');
            }
        } else {
            // "pass" -> "passes", "lash" -> "lashes", "stitch" -> "stitches", "box" -> "boxes", "buzz" -> "buzzes"
            return addSuffix(word, 'es');
        }
    } else if (lowerWord.endsWith('f')) {
        // "wolf" -> "wolves"
        return addSuffix(word.substring(0, word.length - 1), 'ves')
    } else if (lowerWord.endsWith('fe')) {
        // "wife" -> "wives", "life" -> "lives"
        return addSuffix(word.substring(0, word.length - 2), 'ves')
    } else if (lowerWord.endsWith('y')) {
        if (vowels.indexOf(lowerWord.charAt(word.length - 2)) !== -1) {
            // Vowel + "y" -> "ys", e.g. "day" -> "days"
            return addSuffix(word, 's');
        } else {
            // "city" -> "cities"
            return addSuffix(word.substring(0, word.length - 1), 'ies');
        }
    } else if (lowerWord.endsWith('o')) {
        // "potato" -> "potatoes"
        return addSuffix(word, 'es');
    } else {
        // All other words just add "s"
        return addSuffix(word, 's');
    }
}

export {adjectives, animals, colors, comparatives, industries, naturalFeatures, nouns, trees, fruits, vegetables, foods, verbs, pluralize};
