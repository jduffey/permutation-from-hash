var tables = {};
function nCr(n, r) {
    var key = n + "," + r;
    if (key in tables)
        return tables[key];

    if (n < r)
        return 0;

    if (r == 0)
        return 1;

    if (r == 1)
        return n;

    if (n == 1)
        return 1;

    var val = nCr(n - 1, r - 1) + nCr(n - 1, r);
    tables[key] = val;

    return val;
}

function findUniqueCombination(n, k, m) {
    var S = [];
    for (var j = 0; j < k; j++)
        S.push(j);

    var i = 0;
    var t = 0;

    while (i < k) {
        var v = nCr(n - 1 - t, k - i - 1);
        if (v <= m) {
            m = m - v;
        } else {
            S[i] = t;
            i = i + 1;
        }

        t = t + 1;
    }

    return S;
}

const HASH_RANGE_SIZE = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF") + 1n;

function getLexicoOrderIndex(numCombos, hashAsNumber) {
    const chunkSize = HASH_RANGE_SIZE / BigInt(numCombos);
    const myBin = hashAsNumber / chunkSize;

    const result = Number(myBin);

    return result;
}

export class MyCollection {
    constructor(collection) {
        this.collection = collection;
        this.collectionSize = collection.length;
    }

    getCombination(groupSize, hash) {
        const numCombos = nCr(this.collectionSize, groupSize);

        const hashAsNumber = BigInt("0x" + hash);

        const lexicoOrderIndex = getLexicoOrderIndex(numCombos, hashAsNumber);

        const uniqueCombinationIndices = findUniqueCombination(
            this.collectionSize,
            groupSize,
            lexicoOrderIndex,
        );

        const uniqueCombinationElements = uniqueCombinationIndices.map((index) => {
            return this.collection[index];
        });

        return uniqueCombinationElements;
    }
}
