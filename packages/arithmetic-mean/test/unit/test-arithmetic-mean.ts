import test from 'ava'
import { NonEmptyArray } from 'fp-ts/NonEmptyArray'

/**
 * Unit under test
 */

import { arithmeticMean } from '../../src/index'

test('should return a number when given a NonEmptyArray', t => {
    const nea: NonEmptyArray<number> = [0, 10];
    t.is(5, arithmeticMean(nea))
})

test('should return a number when given a spread array', t => {
    t.is(5, arithmeticMean(0, 10))
})
