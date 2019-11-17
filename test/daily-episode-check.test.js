const dailyEpisodeCheck = require("../src/daily-episode-check");
const sampleClient = require("./factory/client");
const fs = require("fs");

jest.mock("fs");

describe("dailyEpisodeCheck", () => {
  beforeEach(() => {
    fs.readFileSync.mockReturnValue(
      JSON.stringify({
        episodes: [
          {
            date: "11/22/2099, 12:00:00 AM",
            serverType: "SW",
            title: "The Mandalorian Episode 3"
          },
          {
            date: "11/22/2099, 12:00:00 AM",
            serverType: "SW",
            title: "The Mandalorian Episode 3"
          },
          {
            date: "11/22/2000, 12:00:00 AM",
            serverType: "SW",
            title: "The Mandalorian Episode 3"
          },
          {
            date: "11/22/2000, 12:00:00 AM",
            serverType: "SW",
            title: "The Mandalorian Episode 3"
          }
        ]
      })
    );
  });

  test("should write to dates.json the episodes that weren't posted", () => {
    dailyEpisodeCheck(sampleClient);

    expect(fs.writeFileSync.mock.calls[0][0]).toEqual("./json/dates.json");
    expect(fs.writeFileSync.mock.calls[0][1]).toEqual(
      JSON.stringify(
        {
          episodes: [
            {
              date: "11/22/2099, 12:00:00 AM",
              serverType: "SW",
              title: "The Mandalorian Episode 3"
            },
            {
              date: "11/22/2099, 12:00:00 AM",
              serverType: "SW",
              title: "The Mandalorian Episode 3"
            }
          ]
        },
        null,
        2
      )
    );
  });

  test("should return the episodes that should be posted", () => {
    const result = dailyEpisodeCheck(sampleClient);

    expect(result).toEqual([
      {
        date: "11/22/2000, 12:00:00 AM",
        serverType: "SW",
        title: "The Mandalorian Episode 3"
      },
      {
        date: "11/22/2000, 12:00:00 AM",
        serverType: "SW",
        title: "The Mandalorian Episode 3"
      }
    ]);
  });
});
