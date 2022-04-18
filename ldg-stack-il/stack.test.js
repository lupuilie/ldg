import Stack from "./stack";
import jest from "jest-mock";

describe("Stack", () => {
  test("should be able to make an instance of class <Stack>", () => {
    const stack = new Stack();
    expect(stack).toBeInstanceOf(Stack);
  });
  test("trying to change <count> property should throw an error", () => {
    const changeCount = jest.fn(() => {
      const stack = new Stack();
      stack.count = 5;
    });
    expect(changeCount).toThrowError(
      /count property cannot be directly changed/
    );
  });
  test("calling push() without an argument shoud throw an error", () => {
    const pushWithoutArg = jest.fn(() => {
      const stack = new Stack();
      stack.push();
    });
    expect(pushWithoutArg).toThrowError("item not provided");
  });
  describe("should be able to push and pop from the Stack", () => {
    const stack = new Stack();
    test("push items <item1>, <item2>, <item3> without throwing an error", () => {
      stack.push("item1");
      stack.push("item2");
      stack.push("item3");
      expect(stack.count).toBe(3);
    });
    test("getLast() should return <item3>", () => {
      expect(stack.getLast()).toBe("item3");
    });
    test("pop() should return <item3>", () => {
      const item3 = stack.pop();
      expect(item3).toBe("item3");
    });
    test("pop() should return <item2>", () => {
      const item2 = stack.pop();
      expect(item2).toBe("item2");
    });
    test("getLast() should return <item1>", () => {
      expect(stack.getLast()).toBe("item1");
    });
    test("pop() should return <item1>", () => {
      const item1 = stack.pop();
      expect(item1).toBe("item1");
    });
    test("stack should have count <0> (zero) after removing all items", () => {
      expect(stack.count).toBe(0);
    });
    test("pop() should return <null> when stack is empty", () => {
      expect(stack.pop()).toBe(null);
    });
    test("getLast() should return null when stack is empty", () => {
      expect(stack.getLast()).toBe(null);
    });
  });
});
