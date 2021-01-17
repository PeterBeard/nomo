/**
 * Nomo: A library for generating normal indentities for normal people
 */
import {generateName} from './name.js';
import {generateAddress} from './place.js';
import {generateBirthday, generateEyeColor, generateHeightIn, generateSex, generateWeightLb} from './person.js';

/**
 * An object containing personal information (name, address, birthday, etc.)
 */
class Person {
    /*
     ** Create a new person with default values
     */
    constructor(name, birthday, height, weight, sex, eyeColor, address, phone, email) {
        if (arguments.length > 0) {
            this.name = name;
            this.birthday = birthday;
            this.height = height;
            this.weight = weight;
            this.sex = sex;
            this.eyeColor = eyeColor;
            this.address = address;
            this.phone = phone;
            this.email = email;
        } else {
            this.name = null;
            this.birthday = null;
            this.height = null;
            this.weight = null;
            this.sex = null;
            this.eyeColor = null;
            this.address = null;
            this.phone = null;
            this.email = null;
        }
    }

    /**
     * Calculate this person's age
     */
    get age() {
        return Math.ceil((new Date() - this.birthday) / 1000 / 86400 / 365);
    }

    /**
     * Generate a random person
     */
    static randomIdentity() {
        const name = generateName();
        const birthday = generateBirthday();
        const sex = generateSex();
        const eyeColor = generateEyeColor();
        const height = generateHeightIn(sex);
        const weight = generateWeightLb(sex);
        const address = generateAddress();
        return new Person(
            name,
            birthday,
            height,
            weight,
            sex,
            eyeColor,
            address,
            null,
            null,
        );
    }
}

export {Person};
