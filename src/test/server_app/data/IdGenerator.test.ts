import { generateRandomId } from "../../../app/server_app/data/IdGenerator";

describe("IdGenerator test suit", () => {
  it("should return a random string", () => {
    const randomId = generateRandomId();
    expect(randomId.length).toBe(20);
  });
});
