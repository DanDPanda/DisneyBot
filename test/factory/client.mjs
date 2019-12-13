import Chance from "chance";
const chance = new Chance();

export const client = {
  channels: {
    get: _ => ({
      fetchMessage: _ =>
        new Promise((resolve, reject) => resolve({ edit: () => null })),
      send: _ => null
    })
  }
};
