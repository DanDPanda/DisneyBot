const fs = require("fs");
require("dotenv").config();

const resetUsers = (message, client) => {
  let rawdata = fs.readFileSync("./json/users.json");
  let jsonData = JSON.parse(rawdata);

  jsonData.users = [];

  fs.writeFileSync("./json/users.json", JSON.stringify(jsonData, null, 2));

  return null;
};

module.exports = resetUsers;
