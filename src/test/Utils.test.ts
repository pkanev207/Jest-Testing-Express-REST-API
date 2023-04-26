import { StringUtils, getStringInfo, toUpperCase } from "../app/Utils";

describe("Utils test suit", () => {
  describe.only("StringUtils tests", () => {
    let sut: StringUtils;
    // makes sure tests are independent from one another
    beforeEach(() => {
      sut = new StringUtils();
      // console.log("Setup");
    });
    // clearing mocks
    afterEach(() => {
      // console.log("Teardown");
    });

    it.todo("test long strings");

    it("Should return correct upperCase", () => {
      const actual = sut.toUpperCase("abc");
      expect(actual).toBe("ABC");
      // console.log("Actual test");
    });

    it("Should throw error on invalid argument - function", () => {
      function expectError() {
        const actual = sut.toUpperCase("");
      }
      expect(expectError).toThrow();
      expect(expectError).toThrowError("Invalid argument!");
    });

    it("Should throw error on invalid argument - arrow function", () => {
      // we don't have reference to the function, so we can assert it only once
      expect(() => {
        sut.toUpperCase("");
      }).toThrowError("Invalid argument!");
    });

    it("Should throw error on invalid argument - try catch block", (done) => {
      try {
        sut.toUpperCase("");
        // if the function is not throwing ->
        done("GetStringInfo should throw error for invalid arg!");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "Invalid argument!");
        done();
      }
    });
  });

  it("should return uppercase of valid string", () => {
    // arrange:
    const sut = toUpperCase;
    const expected = "ABC";
    // act:
    const actual = sut("abc");
    // assert:
    expect(actual).toBe(expected);
  });

  describe("ToUpperCase examples", () => {
    it.each([
      { input: "abc", expected: "ABC" },
      { input: "My-String", expected: "MY-STRING" },
      { input: "dev", expected: "DEV" },
    ])("$input toUpperCase should be $expected", ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

  describe.skip("getStringInfo for arg My-String should", () => {
    test("return right length", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toHaveLength(9);
    });
    test("return right lower case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.lowerCase).toBe("my-string");
    });
    test("return right upper case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.upperCase).toBe("MY-STRING");
    });
    test("return right characters", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toEqual([
        "M",
        "y",
        "-",
        "S",
        "t",
        "r",
        "i",
        "n",
        "g",
      ]);
      expect(actual.characters).toContain<string>("M");
      expect(actual.characters).toEqual(
        expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"])
      );
    });
    test("return defined extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toBeDefined();
    });

    test("return right extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toEqual({});
    });
  });
});
