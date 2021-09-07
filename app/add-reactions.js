const channels = [
    "876833649394319412", //Projets
    "875372225283391489", //NFT
    "882278309164122172", //Play2Earn
    "875372204655771678", //Farming
    "880415002148864081", //Presale
];

const addReactions = async (msg) => {
    if (channels.includes(msg.channelId)) {
        await msg.react("🔥");
        await msg.react("🤨");
        await msg.react("🙅‍♂️");
    }
};

exports.addReactions = addReactions;
