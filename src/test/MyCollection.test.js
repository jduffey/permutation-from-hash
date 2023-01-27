import { MyCollection } from "../modules/MyCollection";

describe("MyCollection.getCombination given hash returns combination", () => {
    const GROUP_SIZE_ONE = 1;
    const GROUP_SIZE_TWO = 2;
    const GROUP_SIZE_THREE = 3;

    describe("for collection with 1 element(s)", () => {
        const collection = [0];

        describe(`group size ${GROUP_SIZE_ONE} for collection [${collection}]`, () => {
            it.each([
                [
                    "0000000000000000000000000000000000000000000000000000000000000000",
                    [0],
                ],
                [
                    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
                    [0],
                ],
            ])("%s -> %s", (hash, expected) => {
                const sut = new MyCollection(collection);

                const actual = sut.getCombination(GROUP_SIZE_ONE, hash);

                expect(actual).toEqual(expected);
            });
        });
    });

    describe("for collection with 2 element(s)", () => {
        const collection = [0, 1];

        describe(`group size ${GROUP_SIZE_ONE} for collection [${collection}]`, () => {
            it.each([
                [
                    "0000000000000000000000000000000000000000000000000000000000000000",
                    [0],
                ],
                [
                    "0000000000000000000000000000000000000000000000000000000000000001",
                    [0],
                ],
                [
                    "7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
                    [0],
                ],
                [
                    "8000000000000000000000000000000000000000000000000000000000000000",
                    [1],
                ],
                [
                    "8000000000000000000000000000000000000000000000000000000000000001",
                    [1],
                ],
                [
                    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
                    [1],
                ],
            ])("%s -> %s", (hash, expected) => {
                const sut = new MyCollection(collection);

                const actual = sut.getCombination(GROUP_SIZE_ONE, hash);

                expect(actual).toEqual(expected);
            });
        });

        describe(`group size ${GROUP_SIZE_TWO} for collection [${collection}]`, () => {
            it.each([
                [
                    "0000000000000000000000000000000000000000000000000000000000000000",
                    [0, 1],
                ],

                [
                    "0000000000000000000000000000000000000000000000000000000000000001",
                    [0, 1],
                ],
                [
                    "7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
                    [0, 1],
                ],
                [
                    "8000000000000000000000000000000000000000000000000000000000000000",
                    [0, 1],
                ],
                [
                    "8000000000000000000000000000000000000000000000000000000000000001",
                    [0, 1],
                ],
                [
                    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
                    [0, 1],
                ],
            ])("%s -> %s", (hash, expected) => {
                const sut = new MyCollection(collection);

                const actual = sut.getCombination(GROUP_SIZE_TWO, hash);

                expect(actual).toEqual(expected);
            });
        });
    });

    describe("for collection with 5 element(s)", () => {
        const collection = [0, 1, 2, 3, 4];

        describe(`group size ${GROUP_SIZE_THREE} for collection [${collection}]`, () => {
            it.each([
                [
                    "0000000000000000000000000000000000000000000000000000000000000000",
                    [0, 1, 2],
                ],
                [
                    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
                    [2, 3, 4],
                ],

                // The upper bound hash that will work without the hack
                [
                    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF9",
                    [2, 3, 4],
                ],
                // The lower bound of the hash that WILL NOT work without the hack
                [
                    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA",
                    [2, 3, 4],
                ],
            ])("%s -> %s", (hash, expected) => {
                const sut = new MyCollection([0, 1, 2, 3, 4]);

                const actual = sut.getCombination(GROUP_SIZE_THREE, hash);

                expect(actual).toEqual(expected);
            });
        });
    });
});
