const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const { API_KEY } = require("./config/config.json");
const { parse } = require("./get-api.js");

client.on("ready", () => {
    console.log("We are ready, start coding !");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }
});

client.on("messageCreate", (msg) => {
    if (msg.author.id === client.application.id) return;
    if (msg.content[0] === "!") {
        let command = msg.content.substring(1);
        parse(command, msg);
    }
});

client.login(API_KEY);
