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
switch (action) {
    case "concert-this":bands(value);
        
            break;
    case "spotify-this-song":spoti(value);
            console.log("funciona");
            break;
    case "movie-this-song":

             break;
    case "do-what-it-says":
    
            break;
    default : console.log('"'+action+'" is not a defined function'); break;
}

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
 
console.log(data); 
console.log(data.tracks.items[0]); 
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
           }
    });
}


console.log("**************");
console.log("APP NOT READY");
