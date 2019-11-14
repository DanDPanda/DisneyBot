const Chance = require('chance');
const chance = new Chance();

const message = {
    author: chance.name(),
    content: chance.sentence()
}

module.exports = message;