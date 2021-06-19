import {choose, randRange, rollAndSum, roll1D} from './random.js';
import {reverse} from './strings.js';
/*
 * Functions for generating a person's contact information
 */

/**
  * Generate a US telephone number
  */
function generatePhone() {
    // Area code must be of the form [2-7][0-8][0-9] and the last two digits
    // can't both be 1
    const areaCodeStart = (10 * randRange(2, 8) + randRange(9)).toString();
    let areaCode = areaCodeStart + randRange(10).toString();
    if (areaCodeStart.charAt(1) === '1') {
        areaCode = areaCodeStart + randRange(2, 10).toString();
    }
    // The central office exchange code must match [2-9][0-9]{2} and the last
    // two digits can't both be 1
    const exchangeCodeStart = (10 * randRange(2, 10) + randRange(10)).toString();
    let exchangeCode = exchangeCodeStart + randRange(10).toString();
    if (exchangeCodeStart.charAt(1) === '1') {
        exchangeCode = exchangeCodeStart + randRange(2, 10).toString();
    }
    // The line number is just [0-9]{4}
    let lineNumber = randRange(10000).toString();
    while (lineNumber.length < 4) {
        lineNumber = '0' + lineNumber;
    }
    return `+1${areaCode}${exchangeCode}${lineNumber}`;
}


/**
  * Generate an email address
  */
function generateEmail(name, birthday) {
    const domains = [
        'coolmail.com',
        'e.mail',
        'fmail.com',
        'wowee.com',
    ];
    const sports = [
        'basketball',
        'football',
        'hockey',
        'soccer',
        'swimteam',
    ];
    const personType = [
        'dude',
        'girl',
        'gurl',
        'guy',
    ];
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];

    let user = firstName.toLowerCase();
    switch (roll1D(20)) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
        const initial = firstName.toLowerCase().charAt(0);
        user = `${initial}.${lastName.replaceAll('-', '').replaceAll('\'', '').toLowerCase()}`;
        break;
    case 11:
        let circumfix = '';
        for (let i = 0; i < rollAndSum(2, 2); i++) {
            if (roll1D(2) == 1) {
                circumfix += 'x';
            } else {
                circumfix += 'X';
            }
        }
        user = circumfix + choose(sports) + choose(personType);
        if (birthday !== undefined) {
            user += birthday.getFullYear().toString();
        }
        user += reverse(circumfix);
        return user;
    default:
        break;
    }
    if (roll1D(6) <= 4) {
        user += randRange(10, 99);
    }
    return `${user}@${choose(domains)}`;
}

export {generateEmail, generatePhone};
