import { getPermutationFromHash } from '../modules/PermutationFinder';

const bigIntToHex = (bigInt) => {
    return bigInt.toString(16);
}

const ZERO_HASH = bigIntToHex(0n);
// const MAX_HASH = 'F'.repeat(64);
const MAX_BIG_INT_256 = 2n ** 256n - 1n;

describe('getPermutationFromHash', () => {
    describe('collection with 1 element(s)', () => {
        const collection = [0];
        it.each([
            [0n],
            [1n],
            [2n],
            [MAX_BIG_INT_256],
        ])(`always returns same permutation (hash as BigInt: %s)`, (testValue) => {
            const actual = getPermutationFromHash(collection, 1, bigIntToHex(testValue));
            expect(actual).toEqual([0]);
        });
    });

    describe('collection with 2 element(s)', () => {
        const collection = [0, 1];

        test('smoke test', () => {
            const actual = getPermutationFromHash(collection, 1, ZERO_HASH);
            expect(actual).toEqual([0]);
        });

        test('smoke test', () => {
            const actual = getPermutationFromHash(collection, 2, ZERO_HASH);
            expect(actual).toEqual([0, 1]);
        });

        test('smoke test', () => {
            const actual = getPermutationFromHash([0, 1], 2, ZERO_HASH);
            expect(actual).toEqual([0, 1]);
        });
    });
});

