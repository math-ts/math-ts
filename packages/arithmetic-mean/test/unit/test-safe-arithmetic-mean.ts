import test from 'ava'
import * as O from 'fp-ts/Option'

/**
 * Unit under test
 */

import { safeArithmeticMean } from '../../src/index'

test('should return none when list is empty', t => {
    t.is(safeArithmeticMean([]), O.none)
})

test('should return some when list is not empty', t => {
    t.deepEqual(safeArithmeticMean([0, 10]), O.some(5))
})
