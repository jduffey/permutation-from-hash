import { MyCollection } from "../modules/MyCollection";

describe("MyCollection.getCombination given hash returns combination", () => {

    describe("for collection with 1 element(s)", () => {
        const collection = ["a"];
        describe("for group size 1", () => {
            const groupSize = 1;
            it.each([
                [
                    "0000000000000000000000000000000000000000000000000000000000000000",
                    ["a"],
                ],
                [
                    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
                    ["a"],
                ],
            ])("for hash = %s", (hash, expected) => {
                const sut = new MyCollection(collection);

                const actual = sut.getCombination(groupSize, hash);

                expect(actual).toEqual(expected);
            });
        });
    });
});
