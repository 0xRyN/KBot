const { GoogleSpreadsheet } = require("google-spreadsheet");

let doc;
let sheet;

const channels = [
    "876833649394319412", //Projets
    "875372225283391489", //NFT
    "882278309164122172", //Play2Earn
    "876833695611375686", //Degen
    "878948702243405824", //Airdrop
];

const initDoc = async () => {
    doc = new GoogleSpreadsheet("1IovIYkBa8fvDZn81s9RIwrf2wC7SixwaLYPLdeGNQ4E");
    await doc.useServiceAccountAuth({
        client_email: process.env.LOG_GOOGLE_EMAIL,
        private_key: process.env.LOG_GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    console.log("Doc title is : " + doc.title);
    sheet = doc.sheetsByIndex[0];
    console.log("Sheet Title is : " + sheet.title);
};

const logMsg = async (msg) => {
    if (channels.includes(msg.channelId)) {
        if (!doc) await initDoc();
        await sheet.addRow({ User: msg.author.username, Message: msg.content });
    }
};

exports.logMsg = logMsg;
