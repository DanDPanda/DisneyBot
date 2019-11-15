const fs = require("fs");

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
  console.log(
    client.channels.get("643960232988377124").fetchMessage("644712642203615242")
  );
  client.channels
    .get("643960232988377124")
    .fetchMessage("644712642203615242")
    .then(editMessage => {
      editMessage.edit(
        "```javascript\n" + JSON.stringify(users.users, null, 2) + "\n```"
      );
    });

  return null;
};

module.exports = reserve;
