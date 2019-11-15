const reserve = require("../../src/commands/reserve");
const fs = require("fs");

jest.mock("fs");
describe("reserve", () => {
  let sampleMessage, sampleClient, sampleJSON;

  beforeEach(() => {
    sampleMessage = require("../factory/message");
    sampleClient = require("../factory/client");
  });

  test("should add a user to the list", () => {
    const jsonUsers = JSON.stringify({
      users: []
    });
    fs.readFileSync.mockReturnValue(jsonUsers);

    reserve(sampleMessage, sampleClient);
  });

  test("should remove a user from the list", () => {
    const jsonUsers = JSON.stringify({
      users: [
        {
          username: sampleMessage.author.username
        }
      ]
    });
    fs.readFileSync.mockReturnValue(jsonUsers);

    reserve(sampleMessage, sampleClient);
  });

  test("should not add a user to the list because it is filled", () => {
    const jsonUsers = JSON.stringify({
      users: [
        {
          username: "sampleMessage.author.username"
        },
        {
          username: "sampleMessage.author.username"
        },
        {
          username: "sampleMessage.author.username"
        },
        {
          username: "sampleMessage.author.username"
        }
      ]
    });
    fs.readFileSync.mockReturnValue(jsonUsers);

    reserve(sampleMessage, sampleClient);
  });
});
