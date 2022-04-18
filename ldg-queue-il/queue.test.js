import Queue from "./queue";
import jest from "jest-mock";

describe("Queue", () => {
  test("should be able to make an instance of class <Queue>", () => {
    const queue = new Queue();
    expect(queue).toBeInstanceOf(Queue);
  });
  describe("should be able to enqueue() and dequeue()", () => {
    const queue = new Queue(5);
    test("enqueue items [<item1> to <item5>] without throwing an error", () => {
      queue.enqueue("item1");
      queue.enqueue("item2");
      queue.enqueue("item3");
      queue.enqueue("item4");
      queue.enqueue("item5");
    });
    test("getFirst() should return <item1> and queue count should be <5> (five)", () => {
      expect(queue.getFirst()).toBe("item1");
      expect(queue.count).toBe(5);
    });
    test("after dequeue() <item1> is removed and getFirst() should return <item2>", () => {
      queue.dequeue();
      expect(queue.getFirst()).toBe("item2");
    });
    test("add <item6> to queue. queue count should be <5> (five) and getFirst() should be <item2>", () => {
      queue.enqueue("item6");
      expect(queue.getFirst()).toBe("item2");
    });
    test("dequeue first 4 items (item2, item3, item4, item5). first in queue should be <item6>", () => {
      queue.dequeue(); // item2
      queue.dequeue(); // item3
      queue.dequeue(); // item4
      queue.dequeue(); // item5
      expect(queue.getFirst()).toBe("item6");
    });
    test("dequeue and add 4 items to the queue. count should be <4> (four) and first item <item1>", () => {
      queue.dequeue();
      queue.enqueue("item1");
      queue.enqueue("item2");
      queue.enqueue("item3");
      queue.enqueue("item4");
      expect(queue.getFirst()).toBe("item1");
    });
    test("dequeue 4 items. queue should have count <0> (zero) and getFirst() to return null", () => {
      queue.dequeue();
      queue.dequeue();
      queue.dequeue();
      queue.dequeue();
      expect(queue.count).toBe(0);
      expect(queue.getFirst()).toBe(null);
    });
    test("trying to dequeue when queue is empty should throw an error", () => {
      const dequeue = jest.fn(() => {
        queue.dequeue();
      });

      expect(dequeue).toThrowError("you cannot dequeue when queue is 0 (zero)");
    });
    test("trying to enqueue more items than queue max count should throw an error", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      queue.enqueue(5);

      const item6 = jest.fn(() => {
        queue.enqueue(6);
      });
      expect(item6).toThrowError("queue is full");
      queue.debug();
    });
  });
});
