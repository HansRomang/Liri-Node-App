require("dotenv").config();
var dataKeys = require("./keys.js");
let fs = require('fs'); //file system
let Spotify = require('node-spotify-api');
let request = require('request');
var inquirer = require('inquirer');

function getMeConcert(concertName) {
	var concertName = ({type: 'track', query: concertName});

	if (!concertName) {
		songname = "Maroon 5";
	}

	var queryConcertUrl = "https://rest.bandsintown.com/artists/" + concertName.query; + "/events?app_id=codingbootcamp";

	request(queryConcertUrl, function(err,response){
		if (err) console.log(err);
		console.log(response.name);
		console.log(response.city);
		console.log(response);
		//console.log("Actors: " + JSON.parse(response));
	});
};


function getMeSpotify(songName) {
	let spotify = new Spotify(dataKeys.spotify);
	// If there is no song name, set the song to Blink 182's What's my age again
	if (!songName) {
			songName = "What's My Age Again?";
	}
	spotify.search({ type: 'track', query: songName }, function(err, data) {
			if (err) {
					console.log('Error occurred: ' + err);
					return;
			} else {
					output =
							"Liri Found:" +
							"\n" + "Song Name: " + "'" + songName.toUpperCase() + "'" +
							"\n"+ "Album Name: " + data.tracks.items[0].album.name +
							"\n" + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
							"\n" + "URL: " + data.tracks.items[0].album.external_urls.spotify;
					console.log(output);
			}
	});

}

function getMeMovie(movieName){
	var movieName = ({type: 'track', query: movieName });
	var queryUrl = "http://www.omdbapi.com/?apikey=dddac733&t=" + movieName.query;

	request(queryUrl, function(err, response, body) {
		if (err) console.log(err);

		console.log("Release Year: " + JSON.parse(body).Year);
		console.log("Title: " + JSON.parse(body).Title);
		console.log("Imdb Rating: " + JSON.parse(body).imdbRating);
		console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);
	})
}

let questions = [{
	type: 'list',
	name: 'programs',
	message: 'What would you like to do?',
	choices: ['Concert Lookup','Spotify', 'Movie','Do what it says']
},{
	type: 'input',
	name: 'concertChoice',
	message: 'What\'s the name of the concert you want to lookup?',
	when: function(answers) {
			return answers.programs == 'Concert Lookup';
	}
},
{
	type: 'input',
	name: 'movieChoice',
	message: 'What\'s the name of the movie you would like?',
	when: function(answers) {
			return answers.programs == 'Movie';
	}
},
{
	type: 'input',
	name: 'songChoice',
	message: 'What\'s the name of the song you would like?',
	when: function(answers) {
			return answers.programs == 'Spotify';
	}
}

];
inquirer
    .prompt(questions)
    .then(answers => {
        switch (answers.programs) {
            case 'Spotify':
								getMeSpotify(answers.songChoice);
								break;
            default:
								console.log('LIRI doesn\'t know that');
						case 'Movie':
						getMeMovie(answers.movieChoice);
						break;
						case 'Concert Lookup':
						getMeConcert(answers.concertChoice);
						break;
        }
    });