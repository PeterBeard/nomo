#!/usr/bin/env node
import commander from 'commander';
import * as name from './name.js';
import * as place from './place.js'

const program = commander.program;
program.version('0.1.0');
program
    .option('-a, --address', 'Also generate an address for each identity')
    .option('-c, --count <value>', 'How many identities to generate')
    .parse(process.argv);

const count = program.count || 1;

for (let i = 0; i < count; i++) {
    console.log(name.generateName());
    if (program.address !== undefined) {
        const addr = place.generateAddress();
        console.log(`${addr[0]}\n${addr[1]}, ${addr[2]} ${addr[3]}`);
    }
    if (i + 1 < count) {
        console.log('------');
    }
}
