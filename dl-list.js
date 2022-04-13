const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const config = require("./config.json");

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

            await dl.close();
            
            await console.log("Downloaded! Converting into mp3...");

            await convert(title, async (out) => {

                if (out == "ERROR") process.exit(1);

                await del(title);

                const tags = {
                    artist: results.videos[0].author.name+"".substring(0,29),
                    album: "YT"
                }

                await setTags(title, tags, (o) => { return });

                await console.log(out);
                await main();
            });
        })

    }).catch(e => {
        console.log("Could not download the video... \nError: " + e.message);
        return false;
    });
}

dl_list.forEach((v) => {
    await main(v);
})
