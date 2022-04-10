const fs = require("fs");

const del = (file) => {
    fs.unlinkSync("DOWNLOADS/mp4/"+file+".mp4");
}
module.exports = del;