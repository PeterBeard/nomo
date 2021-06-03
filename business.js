import {industries} from './words.js';
import {choose, roll1D} from './random.js';


const jobLevels = [
    'Apprentice',
    'Assistant to the',
    'Assistant',
    'Chief',
    'Lead',
    'Master',
    'Principal',
    'Senior',
];
const jobs = [
    'Administrator',
    'Analyst',
    'Assistant',
    'Coordinator',
    'Engineer',
    'Intern',
    'Manager',
    'Operator',
    'Specialist',
    'Supervisor',
    'Technician',
    'Wrangler',
];


/**
  * Generate a job title
  */
function generateJobTitle() {
    if (roll1D(6) > 1) {
        let jobTitle = choose(industries) + ' ' + choose(jobs);
        if (roll1D(3) == 1) {
            return choose(jobLevels) + ' ' + jobTitle;
        } else {
            return jobTitle;
        }
    } else {
        return 'Vice President in Charge of ' + choose(industries);
    }
}


export {generateJobTitle};
