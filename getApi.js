const { GoogleSpreadsheet } = require("google-spreadsheet");
const { GOOGLE_API_KEY } = require("./config.json");

// Initialize the sheet - doc ID is the long id in the sheets URL

let doc;
let sheet;

const initDoc = async () => {
    doc = new GoogleSpreadsheet("1fV3Enny4cLWAAJ3ETo_-nksW8XLLjPmLSv_vjhDLNaA");

    doc.useApiKey(GOOGLE_API_KEY);

    await doc.loadInfo();

    sheet = doc.sheetsByIndex[0];
};

const getApi = async (dApp, token) => {
    await initDoc();
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
                        specificToken: row.PID,
                        APY: row.APY,
                    },
                ];
            }
        }
    });
    return res;
};

const parse = async (str) => {
    const array = str.split(":");
    if (array.length != 2) return [];
    const dApp = array[0].toUpperCase();
    const token = array[1].toUpperCase();
    console.log(dApp, token);
    let res = await getApi(dApp, token);
    return res;
};

exports.getApi = getApi;
exports.parse = parse;
