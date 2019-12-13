import cron from "node-cron";
import Discord from "discord.js";
const client = new Discord.Client();
import dotenv from "dotenv";
dotenv.config();

import { commandList } from "./command-list.mjs";
import { episodeCheck } from "./cron-jobs/episode-check.mjs";
import { resetUsers } from "./cron-jobs/reset-users.mjs";

// Attemps to connect to Discord
try {
  client.login(process.env.DISCORD);
} catch (e) {
  console.log("Discord is down");
}

// Schedule to check the episode dates
cron.schedule("0 10 * * *", () => {
  episodeCheck(client);
});

// Schedule to remove anybody that is active
cron.schedule("0 5 * * *", () => {
  resetUsers(client);
});

// Message the client displays when ready
client.on("ready", () => {
  console.log("Bot Online");
  client.user.setActivity("Disney+", { type: "WATCHING" });
});

// This reads the message and sends the appropriate command
client.on("message", message => {
  const parsedCommand = message.content.split(" ")[0];
  const commandFunction = commandList[parsedCommand];

  if (commandFunction) {
    const commandMessage = commandFunction(message, client);
    if (commandMessage) {
      message.channel.send(commandMessage);
    }
  }
});
