const NodeID3 = require('node-id3');
const config = require('./config.json');

const setTags = async (file, tags, pn, out) => {
    const filepath = config.playlist_dl_path + pn+"/" + file + ".mp3";
    const success = NodeID3.write(tags, filepath);
    out(success);
}

module.exports = setTags;
