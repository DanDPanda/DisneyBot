const Chance = require("chance");
const chance = new Chance();

const client = {
  channels: {
    get: _ => ({
      fetchMessage: _ =>
        new Promise((resolve, reject) => resolve({ edit: () => null })),
      send: _ => null
    })
  }
};

module.exports = client;
