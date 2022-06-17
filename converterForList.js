const nodeCmd = require('node-cmd');
const config = require("./config.json");

const convert = async (video, pn, out) => {
    nodeCmd.run(`ffmpeg -i ${config.playlist_dl_path}/${pn}/${video}.mp4 -b:a ${config.bitrate_mp3} ${config.playlist_dl_path}/${pn}/${video}.mp3`, (err, data, stderr) => {
        if (!err) {
            out("Completed!");
        } else {
            console.log(err);
            out("ERROR");
        }
    });
}

module.exports = convert;
