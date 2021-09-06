//Gets an array and a number, and stores

// let arr = [
//     {
//         apy: 72,
//         name: "Samir",
//     },
//     {
//         apy: 22,
//         name: "Hamid",
//     },
//     {
//         apy: 10,
//         name: "Rayan",
//     },
// ];

// let obj = {
//     apy: 57,
//     name: "Inserted",
// };

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

exports.insert = insert;
