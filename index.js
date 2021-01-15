#!/usr/bin/env node
import commander from 'commander';
import * as name from './name.js';
import * as place from './place.js'
import * as contact from './contact.js'

const program = commander.program;
program.version('0.1.0');
program
    .option('-a, --address', 'Generate an address for each identity')
    .option('-p, --phone', 'Generate a phone number for each identity')
    .option('-c, --count <value>', 'How many identities to generate')
    .parse(process.argv);

const count = program.count || 1;

for (let i = 0; i < count; i++) {
    console.log(name.generateName());
    if (program.address !== undefined) {
        const addr = place.generateAddress();
        console.log(`${addr[0]}\n${addr[1]}, ${addr[2]} ${addr[3]}`);
    }
    if (program.phone !== undefined) {
        const phone = contact.generatePhone();
        // Reformat the phone number from +1AAAEEELLLL to (AAA) EEE-LLLL
        const areaCode = phone.substr(2, 3);
        const exchangeCode = phone.substr(5, 3);
        const lineNumber = phone.substr(8, 4);
        console.log(`(${areaCode}) ${exchangeCode}-${lineNumber}`);
    }
    if (i + 1 < count) {
        console.log('------');
    }
}
