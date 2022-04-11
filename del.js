const fs = require("fs");
const config = require("./config.json");

const del = (file) => {
    fs.unlinkSync(config.dl_path_mp4 +file+".mp4");
}

module.exports = del;
