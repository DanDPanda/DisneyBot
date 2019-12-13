import { ping } from "../../src/commands/ping.mjs";
import { sampleMessage } from "../factory/message.mjs";

describe("ping", () => {
  test("respond with pong", () => {
    expect(ping(sampleMessage)).toEqual("pong");
  });
});
