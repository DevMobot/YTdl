const nodeCmd = require('node-cmd');
const config = require("./config.json");

const convert = async (video, out) => {
    nodeCmd.run(`ffmpeg -i ${config.dl_path_mp4}${video}.mp4 -b:a ${config.bitrate_mp3} ${config.dl_path_mp3}${video}.mp3`, (err, data, stderr) => {
        if (!err) {
            out("Completed!");
        } else {
            console.log(err);
            out("ERROR");
        }
    });
}

module.exports = convert;
