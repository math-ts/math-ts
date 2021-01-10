import { testProp, fc } from 'ava-fast-check'

/**
 * Library under test
 */

import { arithmeticMean } from '../../src/index'

testProp(
    'should act as identity function when list is of length one',
    [fc.nat()],
    (t, natural) => {
        t.is(arithmeticMean([natural]), natural)
    }, {
        verbose: true,
    }
)

// TEST: find more invariants
