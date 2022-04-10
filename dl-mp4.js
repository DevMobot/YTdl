const readline = require("readline");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");

const convert = require("./converter");
const del = require("./del");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n ## Search video or paste video URL. Type '-mp3' to download in mp3 format. \n");

const main = async () => {

    rl.question("Youtube : ", async function (answer) {

        await yts.search(answer.replace("-mp3", '')).then(async results => {

            const videoURL = results.videos[0].url;
            const title = results.videos[0].title.replace(/[^\w\s]/gi, '').split(/ +/).join("_");
            await console.log("Downloading " + title);

            const dl = fs.createWriteStream("DOWNLOADS/mp4/" + title + '.mp4');

            const stream = await ytdl(videoURL,  {
                highWaterMark: 33554432,
            }).pipe(dl);

            await dl.on("finish", async () => {
                await dl.close();
                if (answer.includes('-mp3')) {
                    await console.log("Downloaded! Converting into mp3...");
                    await convert(title, async (out) => {
                        if (out == "ERROR") process.exit(1);
                        await del(title);
                        await console.log(out);
                        await main();
                    });
                } else {
                    await console.log("Download Complete!");
                    await main();
                }
            })

        }).catch(e => {
            console.log("Could not download the video... \nError: " + e.message);
            return;
        });
        
    });
}

main();