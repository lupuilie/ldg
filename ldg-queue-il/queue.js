/**
 *
 * Stacks and Queues
 * https://www.youtube.com/watch?v=A3ZUpyrnCbM&ab_channel=CSDojo
 *
 */

export default class Queue {
  #queue;
  #front;
  #rear;
  #count;
  #maxSize;

  constructor(size = 5) {
    this.#maxSize = size;
    this.#queue = Array(this.#maxSize);
    this.#front = 0;
    this.#rear = 0;
    this.#count = 0;
  }

  get isEmpty() {
    return this.#count === 0;
  }

  get count() {
    return this.#count;
  }

  debug() {
    console.log({
      queue: this.#queue,
      front: this.#front,
      rear: this.#rear,
      count: this.#count,
      maxSize: this.#maxSize,
    });
  }

  enqueue(element) {
    const ERR_MAX_COUNT = `queue is full`;
    const isMaxCount = this.#count === this.#maxSize;
    const isRearAtThreshold = this.#rear === this.#maxSize;

    if (isMaxCount) throw new Error(ERR_MAX_COUNT);
    if (isRearAtThreshold) this.#rear = 0;

    this.#queue[this.#rear] = element;
    this.#count++;
    if (!isMaxCount) this.#rear++;
  }

  dequeue() {
    const ERR_QUEUE_EMPTY = `you cannot dequeue when queue is 0 (zero)`;
    if (this.isEmpty) throw new Error(ERR_QUEUE_EMPTY);
    this.#queue[this.#front] = null;

    this.#front += 1;
    if (this.#front === this.#maxSize) this.#front = 0;

    this.#count--;
  }

  getFirst() {
    if (this.isEmpty) return null;
    return this.#queue[this.#front];
  }
}
