const Chance = require("chance");
const chance = new Chance();

const message = {
  author: {
    username: chance.first(),
    tag: chance.first()
  },
  content: chance.sentence()
};

module.exports = message;
