const channels = [
    "876833649394319412", //Projets
    "875372225283391489", //NFT
    "882278309164122172", //Play2Earn
    "875372204655771678", //Farming
    "880415002148864081", //Presale
];

const addReactions = async (msg) => {
    console.log(typeof msg.channelId);
    if (channels.includes(msg.channelId)) {
        await msg.react(":fire:");
        await msg.react(":face_with_raised_eyebrow:");
        await msg.react(":man_gesturing_no:");
    }
};

exports.addReactions = addReactions;
