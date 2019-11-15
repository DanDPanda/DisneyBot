const Chance = require("chance");
const chance = new Chance();

const client = {
  channels: {
    get: _ => ({
      fetchMessage: _ =>
        new Promise((resolve, reject) => resolve({ edit: () => null }))
    })
  }
};

module.exports = client;
