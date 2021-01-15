import {randRange} from './random.js';
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

export {generatePhone};
