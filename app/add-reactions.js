const addReactions = (msg) => {
    console.log(msg.channelId === "875372171780837406");
    console.log(typeof msg.channelId);
    if (msg.channelId === "875372171780837406") {
        console.log("It's in !");
        msg.react("761601587986432072");
    }
};

exports.addReactions = addReactions;
