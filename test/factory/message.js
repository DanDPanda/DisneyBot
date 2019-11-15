const Chance = require("chance");
const chance = new Chance();

const message = {
  author: {
    username: chance.name()
  },
  content: chance.sentence()
};

module.exports = message;
