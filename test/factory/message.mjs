import Chance from "chance";
const chance = new Chance();

export const message = {
  author: {
    username: chance.first(),
    tag: chance.first()
  },
  content: chance.sentence()
};
