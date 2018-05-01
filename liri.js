/*:::::::::::: REQUIRE :::::::::*/
require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");

/*:::::::::::: INPUT VARIABLES :::::::::*/
var inputString = process.argv;
var serviceInput = inputString[2];
var actionInput = inputString[3];

/*:::::::::::: GLOBAL VARIABLES :::::::::*/
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//switch between functions 
switch (serviceInput) {
    case 'movieThis':
        if (actionInput != undefined) {
            movieThis(actionInput);
        } else {
            defaultMovie();
        }
        break;
    case 'myTweets':
        myTweets();
        break;
    case 'spotifyThisSong':
        if (actionInput != undefined) {
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
       
            var tData = '-------------------------------------------------' + 
            '\nTwitter Username: ' + dataPoint.user.name + 
            '\nTwitter Post Created At: ' + dataPoint.created_at +
            '\nTwitter Post Headline: ' + dataPoint.text +
            '\n-------------------------------------------------'
            ; 
    
            var flName = 'tLog';
            genDataFile(flName, tData);
        }
        }
    });
}

function spotifyThisSong(sInput) {
    console.log('in ' + serviceInput);
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
            console.log('Album: ' + dataPoint.album.name);
            console.log('Track Release Date: ' + dataPoint.album.release_date);
            console.log('Track Link: ' + dataPoint.preview_url);
            console.log('-------------------------------------------------');
      

        var sData = '-------------------------------------------------' + 
        '\nTrack Name: ' + dataPoint.name + 
        '\nTrack Popularity: ' + dataPoint.popularity +
        '\nTrack Author: ' + value + 
        '\nAlbum: ' + dataPoint.album.name + 
        '\nTrack Release Date: ' + dataPoint.album.release_date + 
        '\nTrack Link: ' + dataPoint.preview_url + 
        '\n-------------------------------------------------'; 

        var flName = 'sLog';
        genDataFile(flName, sData);
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

            var mData = '-------------------------------------------------\n' +
                "The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Title +
                "\nThe movie's was released on: " + JSON.parse(body).Released +
                "\nThe movie's IMDB rating is: " + JSON.parse(body).imdbRating +
                "\nThe movie's Rotten Tomatoes rating is: " + value + 
                "\nCountry where the movie was produced: " + JSON.parse(body).Country +
                "\nLanguage of the movie: " + JSON.parse(body).Language + 
                '\n-------------------------------------------------' +
                "\nThe movie's plot: " + JSON.parse(body).Plot + 
                "\nThe movie's actors: " + JSON.parse(body).Actors + 
                '\n-------------------------------------------------';
                var flName = 'mLog';
                genDataFile(flName, mData);

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

function genDataFile(flName, data) {
    fs.appendFile( "logs/" + flName + ".txt", data, function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            console.log(err);
            return;
        }

        // Otherwise, it will print: "movies.txt was updated!"
        console.log(flName + ".txt was updated!");

    });

}