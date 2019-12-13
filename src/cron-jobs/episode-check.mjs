import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const channelIds = {
  MARVEL: process.env.MARVEL_CHANNEL_ID,
  SW: process.env.SW_CHANNEL_ID
};

export const episodeCheck = client => {
  let rawdata = fs.readFileSync("./json/dates.json");
  let jsonData = JSON.parse(rawdata).episodes;

  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago"
  });

  const sends = jsonData.filter(
    data => Date.parse(now) - Date.parse(data.date) > 0
  );
  const keeps = {
    episodes: jsonData.filter(
      data => Date.parse(now) - Date.parse(data.date) < 0
    )
  };

  sends.map(send => {
    client.channels
      .get(channelIds[send.serverType])
      .send(`${send.title} is out!`);
  });

  fs.writeFileSync("./json/dates.json", JSON.stringify(keeps, null, 2));

  return sends;
};
