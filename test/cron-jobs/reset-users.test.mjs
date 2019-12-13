import resetUsers from "../../src/cron-jobs/reset-users";
import sampleClient from "../factory/client.mjs";
import fs from "fs";

jest.mock("fs");

describe("resetUsers", () => {
  beforeEach(() => {
    fs.readFileSync.mockReturnValue(
      JSON.stringify({
        users: [
          {
            username: "Dink",
            startTime: "11/15/2019, 4:56:34 PM"
          }
        ],
        boba: {
          JB: 2,
          Jimmy: 2,
          Timmy: 2
        }
      })
    );
  });

  test("should reset users to []", () => {
    resetUsers(sampleClient);

    expect(fs.writeFileSync.mock.calls[0][0]).toEqual("./json/users.json");
    expect(fs.writeFileSync.mock.calls[0][1]).toEqual(
      JSON.stringify(
        {
          users: [],
          boba: {
            JB: 2,
            Jimmy: 2,
            Timmy: 2
          }
        },
        null,
        2
      )
    );
  });
});
