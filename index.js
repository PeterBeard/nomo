#!/usr/bin/env node
import commander from 'commander';
import * as contact from './contact.js'
import {Person} from './nomo.js';

const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];

const program = commander.program;
program.version('0.1.0');
program
    .option('-a, --address', 'Print the street address for each identity')
    .option('-b, --birthday', 'Print the birthday for each identity')
    .option('-e, --email', 'Print an email address for each identity')
    .option('-p, --phone', 'Print a phone number for each identity')
    .option('-j, --job', 'Print a job title for each identity')
    .option('-c, --count <value>', 'How many identities to generate')
    .parse(process.argv);

const count = program.count || 1;

for (let i = 0; i < count; i++) {
    const person = Person.randomIdentity();
    console.log('Name:      ' + person.name);
    if (program.birthday !== undefined) {
        const year = person.birthday.getFullYear();
        const month = months[person.birthday.getMonth()];
        const day = person.birthday.getDate();
        console.log('Birthday:  ' + day + ' ' + month + ' ' + year + ' (age ' + person.age + ')')
    }
    if (program.address !== undefined) {
        const addressLines = person.address.toString().split('\n');
        console.log('Address:   ' + addressLines[0]);
        for (const line of addressLines.slice(1)) {
            console.log('           ' + line);
        }
    }
    if (program.phone !== undefined) {
        const phone = contact.generatePhone();
        // Reformat the phone number from +1AAAEEELLLL to (AAA) EEE-LLLL
        const areaCode = phone.substr(2, 3);
        const exchangeCode = phone.substr(5, 3);
        const lineNumber = phone.substr(8, 4);
        console.log(`Phone:     (${areaCode}) ${exchangeCode}-${lineNumber}`);
    }
    if (program.email !== undefined) {
        const birthday = person.birthday;
        console.log('Email:     ' + contact.generateEmail(person.name, birthday));
    }
    if (program.job !== undefined) {
        const job = person.job;
        console.log('Job title: ' + job);
    }
    if (i + 1 < count) {
        console.log('-'.repeat(50));
    }
}
