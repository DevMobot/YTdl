const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");

const dl_list = [
    ""
];

const main = async (searchFor) => {
 
    await yts.search(searchFor).then(async results => {

        const videoURL = results.videos[0].url;
        const title = results.videos[0].title.replace(/[^\w\s]/gi, '');
        await console.log("Downloading " + title);

        const dl = fs.createWriteStream("DOWNLOADS/mp4/" + title + '.mp4');

        const stream = await ytdl(videoURL,  {
            highWaterMark: 33554432,
            quality: "highestaudio"
        }).pipe(dl);

        await dl.on("finish", async () => {
            dl.close();
            console.log("Downloded " + title);
            return true;
        });

    }).catch(e => {
        console.log("Could not download the video... \nError: " + e.message);
        return false;
    });
}

dl_list.forEach((v) => {
    setTimeout(() => {
        main(v);
    }, 2000);
})
