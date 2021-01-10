/**
 * arithmetic-mean
 * Calculate arithmetic mean
 */

import * as t from 'io-ts'
import * as A from 'fp-ts/Array'
import * as O from 'fp-ts/Option'
import * as NEA from 'fp-ts/NonEmptyArray'
import { NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { Monoid } from 'fp-ts/Monoid'
import { pipe, constant } from 'fp-ts/function'
import { match, when } from 'ts-pattern'
import Big from 'big.js'

const monoidSum: Monoid<Big> = {
    concat: (a, b) => a.plus(b),
    empty: Big(0),
}

const _arithmeticMean = (as: NonEmptyArray<number>): number => pipe(
    as,
    NEA.map(a => Big(a)),
    NEA.reduce(monoidSum.empty, monoidSum.concat),
    sum => sum.div(as.length),
    result => result.toNumber()
)

export function arithmeticMean(as: NonEmptyArray<number>): number;
export function arithmeticMean(head: number, ...tail: Array<number>): number;

/**
 * Calculate the arithmetic mean of a list of numbers.
 */
export function arithmeticMean(
    head: number | NonEmptyArray<number>,
    ...tail: Array<number>
): number | O.Option<number> {

    const data = A.flatten([
        t.number.is(head) ? [head] : head,
        tail
    ])

    return _arithmeticMean(data as NonEmptyArray<number>)
}

/**
 * Calculate the arithmetic mean of a list of numbers, returning
 * `none` when the list is empty.
 */
export function safeArithmeticMean(as: Array<number>): O.Option<number> {
    return match(as)
        // FIXME: why is this type-guard not narrowing `as`?
        .with(when(A.isNonEmpty), (as) => pipe(
            _arithmeticMean(as as NonEmptyArray<number>),
            O.some
        ))
        .otherwise(constant(O.none))
}
