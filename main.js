import { generateName } from './name.js';
import { generateAddress } from './place.js';
import { abbreviateAddress, abbreviateState, toTitleCase } from './strings.js';
import { generateBirthday, generateEyeColor, generateHeightIn, generatePhoto, generateSex, generateWeightLb } from './person.js';
import { choose, roll1D } from './random.js';

/**
  * Convert a number of inches to feet and inches
  */
function inchesToFeet(totalInches) {
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches - feet * 12);
    return feet + "'" + inches + '"';
}

/**
 * Do a cool transition from an element's current text to some new text
 */
function transitionElementText(element, newText) {
    if (!element.textContent) {
        element.textContent = newText;
    } else {
        // First pad/truncate the existing text to match the length of the new text
        let oldText = element.textContent;
        if (oldText.length > newText.length) {
            oldText = oldText.substring(0, newText.length);
        } else {
            oldText = oldText.padEnd(newText.length);
        }
        element.textContent = oldText;
        // Cycle the letters in the old text until they match
        function cycleLetters(element, newText, totalDelay) {
            const maxDelay = 500;
            let nErrors = 0;
            const currText = element.textContent;
            let rotatedText = '';
            // Rotate any characters that don't match the target string
            for (let charIndex = 0; charIndex < currText.length; charIndex++) {
                let charCode = currText.charCodeAt(charIndex);
                let targetCode = newText.charCodeAt(charIndex);
                // Spaces make for ugly animation
                if (targetCode === 32 || charCode === 32) {
                    charCode = targetCode;
                }
                if (charCode < targetCode) {
                    charCode++;
                    nErrors++;
                } else if (charCode > targetCode) {
                    charCode--;
                    nErrors++;
                }
                rotatedText = rotatedText.concat(String.fromCharCode(charCode));
            }
            element.textContent = rotatedText;
            const delay = Math.min(103 - Math.floor(100 * nErrors / newText.length), 30);
            totalDelay += delay;
            if (element.textContent !== newText && totalDelay < maxDelay) {
                setTimeout(function() {cycleLetters(element, newText, totalDelay)}, delay);
            } else {
                element.textContent = newText;
            }
        }
        cycleLetters(element, newText, 0);
    }
}

/**
  * Generate a class string for the DL
  */
function generateDlClass() {
    let dlClass = 'D';
    if (roll1D(6) == 6) {
        dlClass = choose([
            'A',
            'B',
            'C',
            'X',
        ]);
    }
    return dlClass;
}

/**
  * Generate issued and expiration dates for a DL
  */
function generateIssuedExpirationDates(birthday) {
    const ONE_MONTH_MS = 30 * 24 * 3600 * 1000;
    const issueDate = new Date() - (Math.random() * 24) * ONE_MONTH_MS;
    const expiresDate = issueDate + (Math.random() * 24 + 24) * ONE_MONTH_MS;
    return [new Date(issueDate), new Date(expiresDate)];
}

/**
  * Generate a new identity
  */
function generateIdentity() {
    const name = generateName();
    const nameEl = document.querySelector('#identity .name');
    transitionElementText(nameEl, name);

    const address = generateAddress();
    const streetAddress = abbreviateAddress(address[0]);
    const city = address[1];
    const state = address[2];
    const stateAbbr = abbreviateState(state);
    const zip = address[3];
    document.querySelector('#identity h1.state').textContent = state;
    document.querySelector('#identity .address-1').textContent = streetAddress;
    document.querySelector('#identity .address-2').textContent = city + ', ' + stateAbbr + ' ' + zip;

    const birthday = generateBirthday();
    const birthdayStr = birthday.toISOString().substring(0, 10);
    const age = Math.ceil((new Date() - birthday) / 1000 / 86400 / 365);
    document.querySelector('#identity .birthday .value').textContent = birthdayStr;

    const sex = generateSex();
    const eyes = generateEyeColor();
    const height = generateHeightIn(sex);
    const weight = generateWeightLb(sex);
    const dlClass = generateDlClass();
    document.querySelector('#identity .sex .value').textContent = sex;
    document.querySelector('#identity .eyes .value').textContent = eyes;
    document.querySelector('#identity .height .value').textContent = inchesToFeet(height);
    document.querySelector('#identity .weight .value').textContent = weight;
    document.querySelector('#identity .class .value').textContent = dlClass;

    const dlDates = generateIssuedExpirationDates();
    function formatDate(date) {
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        return month + '-' + date.getFullYear();
    }
    document.querySelector('.issue-date .value').textContent = formatDate(dlDates[0]);
    document.querySelector('.expires-date .value').textContent = formatDate(dlDates[1]);

    const idNumber = String.fromCharCode(Math.random() * 26 + 65) + Math.ceil(Math.random() * 1000000000000);
    document.querySelector('#identity .id-number').textContent = idNumber;

    if (roll1D(10) < 4) {
        const endorsement = choose([
            'HAZARD TO OTHER MOTORISTS',
            'SAFE DRIVER',
            'VOID',
            'PROVISIONAL LICENSE',
            'DO NOT FEED',
            'DO NOT LOOK DIRECTLY INTO EYES',
            'SERIAL COMPLAINER',
        ]);
        document.querySelector('#identity .endorsements').textContent = endorsement;
    } else {
        document.querySelector('#identity .endorsements').textContent = '';
    }

    const photoContainer = document.querySelector('div.photo');
    generatePhoto(photoContainer);
}

window.addEventListener('load', function() {
    document.getElementById('generate-button').addEventListener('click', generateIdentity);
    generateIdentity();
});
