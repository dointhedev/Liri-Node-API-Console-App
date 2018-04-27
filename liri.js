require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var inputString = process.argv;
// Parses the command line argument to capture the "operand" (add, subtract, multiply, etc) and the numbers
var serviceInput = inputString[2];
var actionInput = inputString[3];
//console.log(keys);

// console.log(keys.twitter);
// console.log(keys.spotify);
// var client = new Twitter(keys.twitter);
//  //console.log(spotify);
//  console.log(client);
switch (serviceInput) {
    case 'movieThis':
        if (1 === 1) {
            movieThis(actionInput);
        } else {
            defaultMovie();
        }
        break;
    case 'myTweets':
        myTweets();
        break;
    case 'spotifyThisSong':
        if (1 === 1) {
            spotifyThisSong(actionInput);
        } else {
            defaultSong();
        }
        break;
    case 'doWhatItSays':
        doWhatItSays();
        break;
    default:
        console.log('you should add a name');
}


function myTweets() {
    console.log('in ' + serviceInput);
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitter);
    var params = {
        // screen_name: 'codemedia360'  this one has the 20 listings if you want to check
        screen_name: 'groupBRCA'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            // change to a 20 if you are into that type of stuff
            for (var t = 0; t < 3; t++) {
                var dataPoint = tweets[t]; //tweets[2].user;
                //  console.log(tweets[0]);
                console.log('-------------------------------------------------');
                console.log('Twitter Username: ' + dataPoint.user.name);
                console.log('Twitter Post Created At: ' + dataPoint.created_at);
                console.log('Twitter Post Headline: ' + dataPoint.text);
                console.log('-------------------------------------------------');
            }
        }
    });
}



function spotifyThisSong(sInput) {
    console.log('in ' + serviceInput);
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: 'track',
        query: sInput,
        limit: 10
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items);
        for (var s = 0; s < 10; s++) {
            var dataPoint = data.tracks.items[s];
            console.log('-------------------------------------------------');
            console.log('Track Name: ' + dataPoint.name);
            console.log('Track Popularity: ' + dataPoint.popularity);
            var keys = dataPoint.artists;
            for (var a = 0; a < keys.length; a++) {
                var a = keys[a];
                var value = a.name;
            }
            console.log('Track Author: ' + value);
            console.log('Album: ' + dataPoint.album.name)
            console.log('Track Release Date: ' + dataPoint.album.release_date);
            console.log('Track Link: ' + dataPoint.preview_url);
            console.log('-------------------------------------------------');
        }
    });
}

function doWhatItSays() {
    console.log('in ' + serviceInput);
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(",");
        spotifyThisSong(dataArr[1]);
    });

}

function movieThis(movie) {
    request("https://www.omdbapi.com/?t=" + movie + "=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('-------------------------------------------------');
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie's was released on: " + JSON.parse(body).Released);
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            var keys = JSON.parse(body).Ratings;
            for (var x = 0; x < 2; x++) {
                var k = keys[x];
                var value = k.Value;
            }
            console.log("The movie's Rotten Tomatoes rating is: " + value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log('-------------------------------------------------');
            console.log("The movie's plot: " + JSON.parse(body).Plot);
            console.log('-------------------------------------------------');

            console.log("The movie's actors: " + JSON.parse(body).Actors);
            console.log('-------------------------------------------------');

        } else {
            console.log('else');
        }
    });

}

function defaultMovie() {
    var movie = 'Mr. Nobody.';
    movieThis(movie);

}

function defaultSong() {
    var song = 'The Sign';
    spotifyThisSong(song);

}