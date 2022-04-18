export default class Stack {
  #stack;

  constructor() {
    this.#stack = [];
  }

  get count() {
    return this.#stack.length;
  }

  set count(_) {
    throw new Error("count property cannot be directly changed");
  }

  getLast() {
    if (this.count === 0) return null;
    return this.#stack[this.count - 1];
  }

  pop() {
    if (this.count === 0) return null;
    return this.#stack.pop();
  }

  push(item) {
    if (item === undefined) throw new Error("item not provided");
    this.#stack.push(item);
  }

  display() {
    console.log(this.#stack);
  }
}
