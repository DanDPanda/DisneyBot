const fs = require("fs");

const dailyEpisodeCheck = client => {
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
    client.channels.get(send.serverId).send(`${send.title} is out!`);
  });

  fs.writeFileSync("./json/dates.json", JSON.stringify(keeps, null, 2));

  return sends;
};

module.exports = dailyEpisodeCheck;