const cron = require("node-cron");
const Discord = require("discord.js");
const client = new Discord.Client();

const commandList = require("./command-list");
const dailyEpisodeCheck = require("./daily-episode-check");
const resetUsers = require("./reset-users");
require("dotenv").config();

// Attemps to connect to Discord
try {
  client.login(process.env.DISCORD);
} catch (e) {
  console.log("Discord is down");
}

// Schedule to check the episode dates
cron.schedule("0 10 * * *", () => {
  dailyEpisodeCheck();
});

// Schedule to check the episode dates
cron.schedule("0 5 * * *", () => {
  resetUsers();
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
