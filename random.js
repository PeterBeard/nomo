/**
 * Choose a random element from the given array
 */
function choose(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
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
    return Math.ceil(Math.random() * m);
}

/**
  * Roll n dice with m sides and return their sum
  */
function rollAndSum(n, m) {
    return roll(n, m).reduce((s, v) => s + v);
}
