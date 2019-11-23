const fs = require("fs");
require("dotenv").config();

const resetUsers = client => {
  let rawdata = fs.readFileSync("./json/users.json");
  let jsonData = JSON.parse(rawdata);

  jsonData.users = [];

  fs.writeFileSync("./json/users.json", JSON.stringify(jsonData, null, 2));

  client.channels
    .get(process.env.RESERVE_CHANNEL_ID)
    .fetchMessage(process.env.RESERVE_MESSAGE_ID)
    .then(editMessage => {
      editMessage.edit(
        "```javascript\n" + JSON.stringify(jsonData, null, 2) + "\n```"
      );
    });

  return null;
};

module.exports = resetUsers;
