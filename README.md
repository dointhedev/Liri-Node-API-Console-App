# Liri-Node-API-Console-App
> ### I demonstrate the use of Javascript, Nodejs and Twitter, Spotify/OMDB API's. 

## Project Overview
In this assignment I created LIRI which is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Getting Started Locally 
To get the Node server running locally:

- Clone this repo ([GIT](https://github.com/dointhedev/Liri-Node-API-Console-App.git))
- Install Nodejs on your Mac ([Download](https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew))
- `npm install` to install all required dependencies
- load the .sql file locally and make sure the credentials match up. 
- `node liri.js` to start the node application.

# Code Overview

## Dependencies
- [Twitter](https://www.npmjs.com/package/twitter) - PAn asynchronous client library for the Twitter REST and Streaming API's.
- [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api) -A simple to use API library for the Spotify REST API.
- [Request](https://www.npmjs.com/package/request) - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from .env file
- [OMDB API](http://www.omdbapi.com) - The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users. 

   
## Project Requirements
1. Make a .gitignore file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.
```
node_modules
.DS_Store
.env
```
1. Make a JavaScript file named `keys.js`.
1. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

  * This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.
1. Make a file called `random.txt`.
   * Inside of `random.txt` put the following in with no extra characters or white space: 
     * spotify-this-song,"I Want it That Way"
1. Make a JavaScript file named `liri.js`.
1. Add the code required to import the `keys.js` file and store it in a variable.
1. Make it so liri.js can take in one of the following commands:

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

    * `do-what-it-says`

### What Each Command Should Do

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base. 

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
     * It's on Netflix!
   
4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.

