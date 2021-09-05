const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const { API_KEY } = require("./config.json");
const { parse } = require("./getApi.js");

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
    if (msg.content.substring(0, 2) === "K-") {
        (async () => {
            let res = await parse(msg.content.substring(2));
            if (res.length === 0)
                msg.reply("Token introuvable... Syntaxe : K-[DAPP]:[Token 1]");
            else {
                res.forEach((val) => {
                    let res = `
                    Voici des informations supplémentaires sur votre Token \n**D-APP** : ${val.dApp} \n**Chain** : ${val.chain} \n**Token** : ${val.token}\n**Specific Token** : ${val.specificToken} \n**APY(actualisée chaque 30mn)** : ${val.APY}%
                    `;
                    msg.reply(res);
                });
            }
        })();
    }
});

client.login(API_KEY);
