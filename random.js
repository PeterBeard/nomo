/**
 * Choose a random element from the given array
 */
function choose(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}

/** Choose a random element from the given array using the given item weights
 *
 */
function chooseWeighted(list, weights) {
    for (let i = 0; i < weights.length; i++)
        weights[i] += weights[i - 1] || 0;

    const random = Math.random() * weights[weights.length - 1];

    for (let i = 0; i < weights.length; i++)
        if (weights[i] > random)
            return list[i];
    return list[list.length - 1];
}

/**
  * Generate a random integer in the range [n, m) - default value of n is zero
  */
function randRange(n, m) {
    if (m !== undefined) {
        return n + Math.floor(Math.random() * (m - n));
    } else {
        return Math.floor(Math.random() * n);
    }
}

/**
  * Roll n dice with m sides each (e.g. roll(1, 6) rolls 1d6, roll(2, 20) rolls 2d20, etc.) and return the numbers rolled
  */
function roll(n, m) {
    if (n <= 0) {
        return 0;
    }
    const rolls = [];
    for(let i = 0; i < n; i++) {
        rolls.push(roll1D(m));
    }
    return rolls;
}

/**
  * Roll a single die with m sides
  */
function roll1D(m) {
    return Math.floor(Math.random() * m) + 1;
}

/**
  * Roll n dice with m sides and return their sum
  */
function rollAndSum(n, m) {
    return roll(n, m).reduce((s, v) => s + v);
}

export {choose, chooseWeighted, randRange, roll1D, rollAndSum};
