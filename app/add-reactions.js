const addReactions = (msg) => {
    console.log(msg.channel);
    console.log(msg.channelId);
    if (msg.channelId === 875372171780837406) {
        msg.react("761601587986432072");
    }
};

exports.addReactions = addReactions;
