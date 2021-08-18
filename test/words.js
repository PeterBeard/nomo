import assert from 'assert';
import {pluralize} from '../words.js'


describe('words', function() {
    describe('pluralize', function() {
        it('should add -es for words ending in "s", "ss", "sh", "ch", "x", or "z"', function() {
            assert.equal(pluralize('dress'), 'dresses');
            assert.equal(pluralize('hash'), 'hashes');
            assert.equal(pluralize('crunch'), 'crunches');
            assert.equal(pluralize('tax'), 'taxes');
            assert.equal(pluralize('buzz'), 'buzzes');
            assert.equal(pluralize('fez'), 'fezzes');
            assert.equal(pluralize('gas'), 'gasses');
        });
        it('should switch -fe to -ves', function() {
            assert.equal(pluralize('knife'), 'knives');
            assert.equal(pluralize('life'), 'lives');
            assert.equal(pluralize('wolf'), 'wolves');
        });
        it('should switch -y to -ies', function() {
            assert.equal(pluralize('city'), 'cities');
            assert.equal(pluralize('guppy'), 'guppies');
        });
        it('should switch -y to -ys when the y follows a vowel', function() {
            assert.equal(pluralize('day'), 'days');
            assert.equal(pluralize('toy'), 'toys');
        });
        it('should add -es for words ending in "o" (except for some special cases)', function() {
            assert.equal(pluralize('potato'), 'potatoes');
            assert.equal(pluralize('tornado'), 'tornadoes');
            assert.equal(pluralize('photo'), 'photos');
            assert.equal(pluralize('piano'), 'pianos');
            assert.equal(pluralize('halo'), 'halos');
        });
        it('should not change words with no plural form', function() {
            assert.equal(pluralize('sheep'), 'sheep');
            assert.equal(pluralize('series'), 'series');
            assert.equal(pluralize('deer'), 'deer');
            assert.equal(pluralize('fish'), 'fish');
        });
        it('should handle irregular plurals', function() {
            assert.equal(pluralize('belief'), 'beliefs');
            assert.equal(pluralize('bus'), 'buses');
            assert.equal(pluralize('chef'), 'chefs');
            assert.equal(pluralize('chief'), 'chiefs');
            assert.equal(pluralize('child'), 'children');
            assert.equal(pluralize('foot'), 'feet');
            assert.equal(pluralize('goose'), 'geese');
            assert.equal(pluralize('man'), 'men');
            assert.equal(pluralize('mouse'), 'mice');
            assert.equal(pluralize('ox'), 'oxen');
            assert.equal(pluralize('person'), 'people');
            assert.equal(pluralize('roof'), 'roofs');
            assert.equal(pluralize('tooth'), 'teeth');
            assert.equal(pluralize('woman'), 'women');
        });
        it('should add -s for all other words', function() {
            assert.equal(pluralize('tree'), 'trees');
            assert.equal(pluralize('toast'), 'toasts');
            assert.equal(pluralize('putt'), 'putts');
        });
        it('should add suffixes matching the case of the input word', function() {
            assert.equal(pluralize('moan'), 'moans');
            assert.equal(pluralize('CAKE'), 'CAKES');
        });
    });
});

