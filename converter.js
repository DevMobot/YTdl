const nodeCmd = require('node-cmd');

const convert = async (video, out) => {
    nodeCmd.run(`ffmpeg -i DOWNLOADS/mp4/${video}.mp4 -b:a 64K DOWNLOADS/mp3/${video}.mp3`, (err, data, stderr) => {
        if (!err) {
            out("Completed!");
        } else {
            console.log(err);
            out("ERROR");
        }
    });
}

module.exports = convert;