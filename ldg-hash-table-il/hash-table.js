export default class HashTable {
  #maxSize;
  #table;
  #length;

  constructor(size = 10) {
    this.#maxSize = size;
    this.#table = new Array(this.#maxSize);
    this.#length = 0;
  }

  get length() {
    return this.#length;
  }

  set length(param) {
    throw new Error("length property cannot be directly modified");
  }

  display() {
    console.log(this.#table);
  }

  add(key, value) {
    const data = [key, value];
    const index = hash(key, this.#maxSize);
    const isIndexEmpty = this.#table[index] === undefined;

    this.#length++;
    if (isIndexEmpty) return addToIndex(this.#table, data, index);

    const existingIndex = linearSearch(this.#table[index], key);
    if (existingIndex !== null) throw new Error(`key <${key}> already exists`);
    pushToIndex(this.#table, data, index);
  }

  get(key) {
    const index = hash(key, this.#maxSize);
    const emptyAtIndex = this.#table[index] === undefined;
    if (emptyAtIndex) throw new Error(`key <${key}> not found`);

    const isUniqueEntry = this.#table[index].length === 1;
    const isWantedKey = this.#table[index][0][0] === key;
    const value = this.#table[index][0][1];
    if (isUniqueEntry && isWantedKey) return value;

    const bucketIndex = linearSearch(this.#table[index], key);
    if (bucketIndex) return this.#table[index][bucketIndex][1];

    return null;
  }

  set(key, newValue) {
    const index = hash(key, this.#maxSize);
    const emptyAtIndex = this.#table[index] === undefined;
    if (emptyAtIndex) throw new Error(`key <${key}> not found`);

    const isUniqueEntry = this.#table[index].length === 1;
    const isWantedKey = this.#table[index][0][0] === key;

    if (isUniqueEntry && isWantedKey)
      return (this.#table[index][0][1] = newValue);

    const bucketIndex = linearSearch(this.#table[index], key);
    if (bucketIndex) return (this.#table[index][bucketIndex][1] = newValue);

    throw new Error(`key <${key}> not found`);
  }

  delete(key) {
    const index = hash(key, this.#maxSize);
    const emptyAtIndex = this.#table[index] === undefined;
    if (emptyAtIndex) throw new Error(`key <${key}> not found`);

    this.#length--;
    const isUniqueEntry = this.#table[index].length === 1;
    const isWantedKey = this.#table[index][0][0] === key;

    if (isUniqueEntry && isWantedKey) return (this.#table[index] = undefined);

    const bucketIndex = linearSearch(this.#table[index], key);
    if (bucketIndex) return (this.#table[index][bucketIndex] = undefined);

    throw new Error(`key <${key}> not found`);
  }
}

function hash(key, maxSize = 10) {
  const keyCodes = key.split("").map((char) => char.charCodeAt(0));
  const keyCodesSum = keyCodes.reduce((sum, charCode) => sum + charCode, 0);

  return keyCodesSum % maxSize;
}

function addToIndex(table, data, index) {
  table[index] = [data];
}

function pushToIndex(array, data, index) {
  const lastIndex = array[index].length;
  array[index][lastIndex] = data;
}

function linearSearch(array, key) {
  if (!array) return null;

  for (let index in array) {
    if (array[index][0] === key) return index;
  }

  return null;
}
