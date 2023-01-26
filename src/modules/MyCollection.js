export class MyCollection {
    constructor(collection) {
        this.collection = collection;
    }

    getCombination(groupSize, hash) {
        console.log("groupSize:", groupSize, "hash:", hash);
        return this.collection;
    }
}
