// With help from SuJin Wang (https://www.codementor.io/@grigoriykylypko)
const tables = {};
function nCr(n, r) {
    const key = n + "," + r;
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

    const val = nCr(n - 1, r - 1) + nCr(n - 1, r);
    tables[key] = val;

    return val;
}

function findUniqueCombination(n, k, m) {
    const S = [];
    for (let j = 0; j < k; j++)
        S.push(j);

    let i = 0;
    let t = 0;

    while (i < k) {
        const v = nCr(n - 1 - t, k - i - 1);
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
