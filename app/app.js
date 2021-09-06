require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { parse } = require("./get-api.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const API_KEY = process.env.API_KEY;

client.on("ready", () => {
    console.log("C'est prêt !");
});

client.on("messageCreate", (msg) => {
    if (msg.author.id === client.application.id) return;
    if (msg.content[0] === "!") {
        let command = msg.content.substring(1);
        parse(command, msg);
    }
});

client.login(API_KEY);
