import { reserve } from "../../src/commands/reserve.mjs";
import fs from "fs";

jest.mock("fs");
describe("reserve", () => {
  let sampleMessage, sampleClient, sampleJSON;

  beforeEach(() => {
    sampleMessage = require("../factory/message.mjs");
    sampleClient = require("../factory/client.mjs");
    const mockDate = new Date(1466424490000);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should add a user to the list", () => {
    const jsonUsers = JSON.stringify({
      users: [],
      boba: {}
    });
    fs.readFileSync.mockReturnValue(jsonUsers);

    reserve(sampleMessage, sampleClient);

    expect(fs.writeFileSync.mock.calls[0][0]).toEqual("./json/users.json");
    expect(fs.writeFileSync.mock.calls[0][1]).toEqual(
      JSON.stringify(
        {
          users: [
            {
              username: sampleMessage.author.username,
              startTime: new Date().toLocaleString("en-US", {
                timeZone: "America/Chicago"
              })
            }
          ],
          boba: {}
        },
        null,
        2
      )
    );
  });

  test("should remove a user from the list", () => {
    const jsonUsers = JSON.stringify({
      users: [
        {
          username: sampleMessage.author.username,
          startTime: new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago"
          })
        }
      ],
      boba: {}
    });
    fs.readFileSync.mockReturnValue(jsonUsers);

    reserve(sampleMessage, sampleClient);

    expect(fs.writeFileSync.mock.calls[0][0]).toEqual("./json/users.json");
    expect(fs.writeFileSync.mock.calls[0][1]).toEqual(
      JSON.stringify(
        {
          users: [],
          boba: {}
        },
        null,
        2
      )
    );
  });

  test("should not add a user to the list because it is filled", () => {
    const jsonUsers = JSON.stringify({
      users: [
        {
          username: "sampleMessage.author.username",
          startTime: new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago"
          })
        },
        {
          username: "sampleMessage.author.username",
          startTime: new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago"
          })
        },
        {
          username: "sampleMessage.author.username",
          startTime: new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago"
          })
        },
        {
          username: "sampleMessage.author.username",
          startTime: new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago"
          })
        }
      ],
      boba: {}
    });
    fs.readFileSync.mockReturnValue(jsonUsers);

    reserve(sampleMessage, sampleClient);

    expect(fs.writeFileSync.mock.calls[0][0]).toEqual("./json/users.json");
    expect(fs.writeFileSync.mock.calls[0][1]).toEqual(
      JSON.stringify(
        {
          users: [
            {
              username: "sampleMessage.author.username",
              startTime: new Date().toLocaleString("en-US", {
                timeZone: "America/Chicago"
              })
            },
            {
              username: "sampleMessage.author.username",
              startTime: new Date().toLocaleString("en-US", {
                timeZone: "America/Chicago"
              })
            },
            {
              username: "sampleMessage.author.username",
              startTime: new Date().toLocaleString("en-US", {
                timeZone: "America/Chicago"
              })
            },
            {
              username: "sampleMessage.author.username",
              startTime: new Date().toLocaleString("en-US", {
                timeZone: "America/Chicago"
              })
            }
          ],
          boba: {}
        },
        null,
        2
      )
    );
  });
});
