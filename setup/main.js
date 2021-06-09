'use strict';

const fs = require('fs');
const rimraf = require('rimraf');
const unzipper = require('unzipper');
const http = require('https'); //change to https in prod
const cliCursor = require('cli-cursor');

cliCursor.hide()

process.title = "Mod installer setup";

var download_link = "https://kcgdnetwork.net/mcModInstaller/installer.zip";

var loadingBar = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", ];
//didnt bother to learn cli-progress module, this will probably do
//actually maybe i should learn it, it seems better
//if ur seeing this i gave up and stuck with this lmao

var consoleLog = [];
var loadprogress = 0;


/*

    TODO:
    it works
    make it delete the installer.zip after extraction
    and make it auto start the installer once installation done
    MAKE UPDATE FUNCTION (maybe)

*/


//ENTRY POINT (its kinda confusing to find to i put it here)

if (fs.existsSync(process.cwd() +"/mcModInstaller")){

    //installer already exists
    consoleLog.push("starting mod installer...")
    require('child_process').exec("start mcModInstaller\\Mod_installer.exe")
    setTimeout(function(){

        process.exit();

    },5000)

} else {

    consoleLog.push("downloading: "+download_link);
    consoleLog.push("[" + loadingBar.join("") + "] | " + loadprogress + "%");
    largeHttpGet(download_link, function(data){

        fs.writeFileSync(process.cwd()+"/installer.zip",data);
        fs.mkdirSync(process.cwd()+"/mcModInstaller");

        consoleLog.push("extracting...");



        fs.createReadStream(process.cwd()+"/installer.zip")

            .pipe(unzipper.Parse())

            .on('entry', function (entry) {

                //console.log(entry)

                var fileName = entry.path;
                var type = entry.type; // 'Directory' or 'File'
                var size = entry.vars.uncompressedSize; // There is also compressedSize;

                //console.log("extract: " + fileName);
                //modsTextArea.elementJQ.scrollTop(modsTextArea.elementJQ.prop("scrollHeight"));

                if(type === "Directory"){

                    fs.mkdirSync(process.cwd()+"/mcModInstaller/"+fileName);
                    
                } else {

                    entry.pipe(fs.createWriteStream(process.cwd() + "/mcModInstaller/" + fileName));

                }

            })

            .promise()

            .then(() => done(), e => consoleLog.push('error', e));


            function done(){

                rimraf(process.cwd()+"/installer.zip",function(err){

                    if(err){

                        console.log(err);
                        process.exit();

                    } else {

                        consoleLog.push("done! starting installer...");

                        require('child_process').exec("start mcModInstaller\\Mod_installer.exe")
                        setTimeout(function () {

                            process.exit();

                        }, 5000)

                    }

                })

            }

    }, function(progress){

        loadprogress = Math.round(progress * 0.4);


        for (var i = 0; i < loadprogress;i++){

            loadingBar.splice(i,1,"#");
            consoleLog.splice(1, 1, "[" + loadingBar.join("") + "] | " + loadprogress * 2.5 + "%")

        }

    })

}


function refreshConsole(){

    console.clear();
    for (var i = 0; i < consoleLog.length; i++){

        console.log(consoleLog[i]);

    }

}


var consoleLoop = setInterval(function(){

    refreshConsole();

}, 200)


function largeHttpGet(url, callback, progress) {

    console.log("download [NODEJS]: " + url);

    var _current = 0;
    var _buffer = [];

    var _req = http.get(url, function (res) {

        var _total = parseInt(res.headers['content-length'], 10);
        //console.log("total: "+_total)

        res.on('data', function (chunk) {
            _buffer.push(chunk);

            //console.log(_current + " + " + chunk.length + " = " + _current + chunk.length)

            _current = parseFloat(_current + chunk.length);
            //console.log("PROGRESS: "+ _current)
            progress(_current / _total * 100);
        })

        res.on('end', function () {
            callback(Buffer.concat(_buffer));
            //console.log("request end");
        })

    })

}