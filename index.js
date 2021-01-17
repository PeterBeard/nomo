#!/usr/bin/env node
import commander from 'commander';
import * as contact from './contact.js'
import {Person} from './nomo.js';

const program = commander.program;
program.version('0.1.0');
program
    .option('-a, --address', 'Generate an address for each identity')
    .option('-e, --email', 'Generate an email address for each identity')
    .option('-p, --phone', 'Generate a phone number for each identity')
    .option('-c, --count <value>', 'How many identities to generate')
    .parse(process.argv);

const count = program.count || 1;

for (let i = 0; i < count; i++) {
    const person = Person.randomIdentity();
    console.log('Name:    ' + person.name);
    if (program.address !== undefined) {
        const addressLines = person.address.toString().split('\n');
        console.log('Address: ' + addressLines[0]);
        for (const line of addressLines.slice(1)) {
            console.log('         ' + line);
        }
    }
    if (program.phone !== undefined) {
        const phone = contact.generatePhone();
        // Reformat the phone number from +1AAAEEELLLL to (AAA) EEE-LLLL
        const areaCode = phone.substr(2, 3);
        const exchangeCode = phone.substr(5, 3);
        const lineNumber = phone.substr(8, 4);
        console.log(`Phone:   (${areaCode}) ${exchangeCode}-${lineNumber}`);
    }
    if (program.email !== undefined) {
        const birthday = person.birthday;
        console.log('Email:   ' + contact.generateEmail(person.name, birthday));
    }
    if (i + 1 < count) {
        console.log('-'.repeat(50));
    }
}
