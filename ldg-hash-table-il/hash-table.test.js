import HashTable from "./hash-table";
import jest from "jest-mock";

describe("HashTable", () => {
  test("should be able to make an instance of class <HashTable>", () => {
    const ht = new HashTable();
    expect(ht).toBeInstanceOf(HashTable);
  });
  describe("should be able to add, get, set and delete values", () => {
    const ht = new HashTable();

    test("add key <foo> with value <bar> without throwing an error", () => {
      const add = jest.fn(() => ht.add("foo", "bar"));
      add();
      expect(add).toHaveReturned();
    });
    test("get correct value of key <foo>", () => {
      const value = ht.get("foo");
      expect(value).toEqual("bar");
    });
    test("adding multiple key-value pairs and not throwing an error", () => {
      const batchAdd = jest.fn(() => {
        ht.add("bar", "baz");
        ht.add("baz", "bar");
        ht.add("bad", "evil");
      });
      batchAdd();
      expect(batchAdd).toHaveReturned();
    });
    test("adding key <foo> which already exists should throw an error", () => {
      const duplicateAdd = jest.fn(() => {
        ht.add("foo", "other value");
      });
      expect(duplicateAdd).toThrowError(/key <foo> already exist/);
    });
    test("set key <foo> to value <table> and get correct <foo> value", () => {
      ht.set("foo", "table");
      const foo = ht.get("foo");

      expect(foo).toEqual("table");
    });
    test("trying to set a value to <inexistent> key should throw an error", () => {
      const inexistent = jest.fn(() => {
        ht.set("inexistent", "value");
      });
      expect(inexistent).toThrowError(/key <inexistent> not found/);
    });
    test("delete key <foo> should not throw an error", () => {
      const removeFoo = jest.fn(() => {
        ht.delete("foo");
      });
      removeFoo();
      expect(removeFoo).toHaveReturned();
    });
    test("trying to get a deleted key should throw an error", () => {
      const getFooValue = jest.fn(() => {
        const value = ht.get("foo");
      });
      expect(getFooValue).toThrowError(/key <foo> not found/);
    });
  });
  describe("should be able to get the count of elements in HashTable", () => {
    const ht = new HashTable();
    test("instance of an empty HashTable should have length <0> (zero)", () => {
      expect(ht.length).toBe(0);
    });
    test("after adding keys <foo> and <bar>, length should be <2> (two)", () => {
      ht.add("foo", "bar");
      ht.add("bar", "baz");

      expect(ht.length).toBe(2);
    });
    test("after delete key <foo>, length should be <1> (one) ", () => {
      ht.delete("foo");
      expect(ht.length).toBe(1);
    });
    test("trying to directly change length property should throw an error", () => {
      const changeLength = jest.fn(() => {
        ht.length = 0;
      });
      expect(changeLength).toThrowError(
        /length property cannot be directly modified/
      );
    });
  });
});
