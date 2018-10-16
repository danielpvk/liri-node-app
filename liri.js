//var dotenv=require("dotenv").config();
var Spotify = require('node-spotify-api');
//var spotify = new Spotify(keys.spotify);
// Load the fs package to read and write
var fs = require("fs");
// Take two arguments.
// The first will be the action (i.e. "concert-this`* `spotify-this-song`* `movie-this`* `do-what-it-says`
// The second will the search term
var [action,...extra]=process.argv.slice(2);//action guardamos lo de 2, y en extra todo lo demas
var value=extra.join(" ");
// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.

function spoti(song){
 
 
    var spotify = new Spotify({
        id: "5b0c9495395746a2964d3373501d3990",
        secret: "8e3925c8235d43718d91d96a609f8e38"
    });
    console.log(value);
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
             return console.log('Error occurred: ' + err);
         }
        for (var i=0; i<10;i++)
        {   console.log("**************");
            console.log("***ARTIST : "+data.tracks.items[i].artists[0].name);
            console.log("***ALBUM : "+data.tracks.items[i].album.name);
            console.log("***SONG : "+data.tracks.items[i].name);
            console.log("***SPOTIFY LINK : "+data.tracks.items[i].external_urls.spotify);
            console.log("");
        }
    });
}

function bands(band){
    var bandsintown = require('bandsintown')("codingbootcamp");
    bandsintown
        .getArtistEventList(band)
        .then(function(events) {
            //console.log(events);
            for (var i=0;i<10;i++)
            {
                console.log(events[i].title);
                console.log(events[i].venue.name+" in "+events[i].venue.city);
                console.log(events[i].formatted_datetime);
                console.log("**************");
                console.log("");
           }
    });
}

function omdb(movie){
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    var request = require("request");
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Title: "+JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    }
    });

}
var what=function(){
    fs = require('fs');
    fs.readFile('random.txt', 'utf8', function (err,data) {
        if (err) {
            return console.log("error"+err);
        }
        var dataArray=data.split(',',2);
        console.log("action "+dataArray[0]);
        console.log("value "+dataArray[1]);
        selector(dataArray[0],dataArray[1]);
        
    });

}
function selector(action,value){
    switch (action) {
        case "concert-this":bands(value);
            
                break;
        case "spotify-this-song":spoti(value);
                console.log("funciona");
                break;
        case "movie-this":
                omdb(value);
                break;
        case "do-what-it-says":
                what();

                //selector(args.action,args.value);
                break;
        default : console.log('"'+action+'" is not a defined function.  You can try one of the following: ');
                console.log("");
                console.log("concert-this");
                console.log("spotify-this-song");
                console.log("movie-this");
                console.log("do-what-it-says"); break;
    }
}

selector(action,value);