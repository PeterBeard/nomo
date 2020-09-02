/*
 * Functions for generating an entire person
 */


/**
  * Generate a plausible birthday for a living person
  */
function generateBirthday(minAge) {
    if (minAge === undefined) {
        minAge = 0;
    }
    const age = Math.max(minAge, rollAndSum(6, 12)); // Roll 6d12 to get an approximate age

    // Compute a date that gives something close to the desired age
    const birthYear = new Date().getFullYear() - age;
    const yearOffset = roll1D(365) * 24 * 60 * 60 * 1000;
    return new Date(new Date(birthYear, 0).getTime() + yearOffset);
}

/**
  * Generate a random sex string for a driver's license
  */
function generateSex() {
    if (roll1D(2) === 1) {
        return 'F';
    } else {
        return 'M';
    }
}

/**
  * Generate a random weight (in pounds)
  */
function generateWeightLb(sex) {
    if (sex === 'M') {
        return rollAndSum(30, 12);
    } else {
        return rollAndSum(30, 10);
    }
}


/**
  * Generate a random height (in inches)
  */
function generateHeightIn(sex) {
    if (sex === 'M') {
        return rollAndSum(28, 4);
    } else {
        return rollAndSum(25, 4);
    }
}

/**
  * Generate a random eye color
  */
function generateEyeColor() {
    return choose([
        'BRN',
        'GRN',
        'BLU',
    ]);
}

/**
  * Generate a photo to use on a driver's license
  */
function generatePhoto() {
    const photo = new Image();
    photo.src = 'sprites/mystery_face.png';
    return photo;
}
