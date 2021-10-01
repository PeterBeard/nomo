import {industries, foods, nouns, pluralize} from './words.js';
import {choose, roll1D} from './random.js';
import {toTitleCase} from './strings.js';


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
    'Inspector',
    'Intern',
    'Jockey',
    'Manager',
    'Operator',
    'Specialist',
    'Supervisor',
    'Technician',
    'Wrangler',
];
const foodJobs = [
    'Chef',
    'Farmer',
    'Stylist',
    'Inspector',
    'Sommelier',
    'Taster',
];
const nonJobs = [
    'Urban Explorer',
];


/**
  * Generate a job title
  */
function generateJobTitle() {
    function appendTitle(word, job) {
        if (job === undefined) {
            job = choose(jobs)
        }
        let jobTitle = `${toTitleCase(word)} ${job}`;
        if (roll1D(3) == 1) {
            return `${choose(jobLevels)} ${jobTitle}`;
        } else {
            return jobTitle;
        }
    }
    switch (roll1D(10)) {
    case 1:
        return `Vice President in Charge of ${choose(industries)}`;
    case 2:
        return `Vice President in Charge of ${pluralize(choose(nouns))}`;
    case 3:
        return appendTitle(choose(foods), choose(foodJobs));
    default:
        return appendTitle(choose(industries));
    }
}


export {generateJobTitle};
