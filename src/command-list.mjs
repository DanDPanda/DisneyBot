import { ping } from "./commands/ping.mjs";
import { reserve } from "./commands/reserve.mjs";

export const commandList = {
  "!ping": ping,
  "!reserve": reserve
};
