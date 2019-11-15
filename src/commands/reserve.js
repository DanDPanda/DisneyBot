const fs = require("fs");
require("dotenv").config();

const removeUser = (users, username) => {
  return users.filter(user => user.username !== username);
};

const pushUser = (users, username) => {
  const user = {
    username: username,
    startTime: new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago"
    })
  };
  return users.push(user);
};

const reserve = (message, client) => {
  let rawdata = fs.readFileSync("./json/users.json");
  let users = JSON.parse(rawdata).users;
  if (users.find(user => user.username === message.author.username)) {
    users = removeUser(users, message.author.username);
  } else {
    users.length < 4 ? pushUser(users, message.author.username) : users;
  }

  users = { users };

  fs.writeFileSync("./json/users.json", JSON.stringify(users, null, 2));
  client.channels
    .get(process.env.RESERVE_CHANNEL_ID)
    .fetchMessage(process.env.RESERVE_MESSAGE_ID)
    .then(editMessage => {
      editMessage.edit(
        "```javascript\n" + JSON.stringify(users.users, null, 2) + "\n```"
      );
    });

  return null;
};

module.exports = reserve;
