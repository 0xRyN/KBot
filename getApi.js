const { GoogleSpreadsheet } = require("google-spreadsheet");
const { GOOGLE_API_KEY } = require("./config.json");
const { insert } = require("./util");
fs = require("fs");

// Initialize the sheet - doc ID is the long id in the sheets URL

let doc;
let sheet;

const initDoc = async () => {
    //doc = new GoogleSpreadsheet("1fV3Enny4cLWAAJ3ETo_-nksW8XLLjPmLSv_vjhDLNaA"); RAYAN COPY
    doc = new GoogleSpreadsheet("1OlLchnnjb-mU1sVDRpEiBMLc833T3HW6IyRT0_rqXOY");

    doc.useApiKey(GOOGLE_API_KEY);

    await doc.loadInfo();

    sheet = doc.sheetsByIndex[0];
};

const getApi = async (dApp, token, msg) => {
    if (!doc) await initDoc();
    const rows = await sheet.getRows({
        offset: 1,
    });
    let res = [];
    rows.forEach((row) => {
        if (dApp === row.dApp.split(" ")[0].toUpperCase()) {
            if (token === row["Token 1"].toUpperCase()) {
                res = [
                    ...res,
                    {
                        dApp: row.dApp,
                        chain: row.Chain,
                        token: row["Token 1"],
                        token2: row["Token 2 (if pool)"],
                        specificToken: row.PID,
                        apy: parseFloat(row.APY.replace(",", ".")),
                        risk: row["Risk / 10"],
                        link: row.Link,
                    },
                ];
            }
        }
    });
    if (res.length === 0)
        msg.reply("Token introuvable... Syntaxe : K-[DAPP]:[Token 1]");
    else {
        let finalRes =
            "Voici des informations supplémentaires sur votre (vos) Token(s) :\n";
        res.forEach((val) => {
            let token2 = val.token2 ? `- ${val.token2}` : ""; // If token 2 exists, token2 = "- token2"
            let res = `\n**dApp** : ${val.dApp} \n**Chain** : ${val.chain} \n**Token** : ${val.token} ${token2}\n**APY** : ${val.apy}%\n**Sécurité** : ${val.risk}/10\n**Link** : <${val.link}>\n`;
            finalRes += res;
        });
        msg.reply(finalRes);
    }
};

const getLeaderboard = async (msg) => {
    if (!doc) await initDoc();
    const rows = await sheet.getRows({
        offset: 0,
    });
    let res = [];
    rows.forEach((row) => {
        insert(res, {
            dApp: row.dApp,
            chain: row.Chain,
            token: row["Token 1"],
            token2: row["Token 2 (if pool)"],
            specificToken: row.PID,
            apy: parseFloat(row.APY.replace(",", ".")),
            risk: row["Risk / 10"],
            link: row.Link,
        });
    });
    let top5 = res.slice(0, 5);
    let str = "Voici le Top 5 des pools du KFarm avec les meilleurs APY :\n";
    let emoji = "";
    top5.forEach((val, index) => {
        let token2 = val.token2 ? `- ${val.token2}` : ""; // If token 2 exists, token2 = "- token2"
        switch (index) {
            case 0:
                emoji = ":first_place:";
                break;
            case 1:
                emoji = ":second_place:";
                break;
            case 2:
                emoji = ":third_place:";
                break;
            default:
                emoji = ":medal:";
                break;
        }
        let topres = `\n${emoji} Top ${index + 1} \n**dApp** : ${
            val.dApp
        } \n**Chain** : ${val.chain} \n**Token** : ${
            val.token
        } ${token2}\n**APY** : ${val.apy}%\n**Sécurité** : ${
            val.risk
        }/10\n**Link** : <${val.link}>\n`;
        str += topres;
    });
    msg.reply(str);
    // fs.writeFile("./arr.json", JSON.stringify(res), (err) => {
    //     if (err) console.log(err);
    // });
};

const parse = async (command, msg) => {
    //
    // Command : Get Token Info From Sheet
    //

    const array = command.split(":");
    if (array.length == 2) {
        const dApp = array[0].toUpperCase();
        const token = array[1].toUpperCase();
        getApi(dApp, token, msg);
    }

    //
    // Command : Get Leaderboard From Sheet
    //
    else {
        switch (command.toLowerCase()) {
            case "leaderboard":
                getLeaderboard(msg);
                break;
        }
    }
};

exports.parse = parse;
