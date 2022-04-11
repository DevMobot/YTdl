const axios = require('axios');
const NodeID3 = require('node-id3');
const dl_path_mp3 = require('./config.json').dl_path_mp3;

const setTags = async (file, tags, out) => {
    const filepath = dl_path_mp3 + file + ".mp3";
    const success = NodeID3.write(tags, filepath);
    out(success);
}

module.exports = setTags;
