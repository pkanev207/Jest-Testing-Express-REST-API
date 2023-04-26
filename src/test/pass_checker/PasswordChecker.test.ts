import {
  PasswordChecker,
  PasswordErrors,
} from "../../app/pass_checker/PasswordChecker";

describe("PasswordChecker test suite", () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it("Password with less than 8 chars is invalid", () => {
    const actual = sut.checkPassword("1234567");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it("Password with 8 or more chars is ok", () => {
    const actual = sut.checkPassword("12345678Aa");
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it("Password with no upper case is invalid", () => {
    // const actual = sut.checkPassword("12345678a");
    const actual = sut.checkPassword("abcd");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it("Password with upper case is ok", () => {
    const actual = sut.checkPassword("abcdA");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it("Password with no lower case is invalid", () => {
    const actual = sut.checkPassword("12345678A");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it("Password with lower case is ok", () => {
    const actual = sut.checkPassword("12345678Aa");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it("Complex password is valid", () => {
    const actual = sut.checkPassword("12345678Aa");
    expect(actual.valid).toBe(true);
    expect(actual.reasons).toHaveLength(0);
  });

  it("Admin password with no number is invalid", () => {
    const actual = sut.checkAdminPassword("abcdAB");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
  });

  it("Admin password with number is ok", () => {
    const actual = sut.checkAdminPassword("12345678Aa");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  });

  it("Admin password is valid", () => {
    const actual = sut.checkAdminPassword("12345678Aa");
    expect(actual.reasons).toHaveLength(0);
  });
});
