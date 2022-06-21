const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");
const config = require("./config.json");
const readline = require("readline");

const setTags = require('./setTagsForList');
const convert = require("./converterForList.js");
const del = require("./delForList.js");
const path = require("path");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const main = async () => {

    const dl_playlist = async (id, pn) => {
        const data = await yts.search({ listId: id });

        

        data.videos.forEach(async v => {
            const title = v.title.replace(/[^\w\s]/gi, '').split(/ +/).join("_");
            const dl = fs.createWriteStream(config.playlist_dl_path + pn+"/" + title + ".mp4");

            await console.log("Downloading " + v.title.substring(0, 45)+"...");

            await ytdl("https://youtube.com/watch?v=" + v.videoId,  {
                highWaterMark: 33554432,
                quality: "highestaudio"
            }).pipe(dl);
            
            await dl.on("finish", async () => {

                await dl.close();
                
                await console.log("Downloaded! Converting into mp3...");
    
                await convert(title, pn, async (out) => {
    
                    if (out == "ERROR") process.exit(1);
    
                    await del(title, pn);
    
                    const tags = {
                        artist: v.author.name,
                        album: pn
                    }
    
                    await setTags(title, tags, pn,(o) => { return });
    
                    await console.log(out);
                });
            })

        })
    }
    

    const c = async (name) => {
        fs.mkdirSync(path.join(__dirname, config.playlist_dl_path+"", name));

        await rl.question("Playlist URL: ", (a) => {
            dl_playlist(a, name);
        });
    }

    
    await rl.question("Folder Name: ", async (a) => {
        await c(a);
    });
 

}

main()