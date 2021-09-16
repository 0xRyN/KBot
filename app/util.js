const insert = (arr, obj) => {
    const val = obj.apy;
    let low = 0;
    let high = arr.length;
    while (low < high) {
        let mid = (low + high) >>> 1;
        if (arr[mid].apy < val) high = mid;
        else low = mid + 1;
    }
    arr.splice(low, 0, obj);
};

function copyClipboard(str) {
    var proc = require("child_process").spawn("pbcopy");
    proc.stdin.write(str);
    proc.stdin.end();
}

exports.copyClipboard = copyClipboard;
exports.insert = insert;
