const fs = require("fs");
const config = require("./config.json");

const del = (file, pn) => {
    fs.unlinkSync(config.playlist_dl_path+pn+"/" +file+".mp4");
}

module.exports = del;
