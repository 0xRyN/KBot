require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { parse } = require("./get-api.js");
const { addReactions } = require("./add-reactions");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

const API_KEY = process.env.API_KEY;

client.on("ready", () => {
    console.log("C'est prêt !");
});

client.on("messageCreate", (msg) => {
    // Check if message hasn't been sent by bot itself

    if (msg.author.id === client.application.id) return;

    // Check if message is a command (!leaderboard)

    if (msg.content[0] === "!") {
        let command = msg.content.substring(1);
        parse(command, msg);
    }

    // Check if message is sent in specific channel and add reactions

    addReactions(msg);
});

client.login(API_KEY);
