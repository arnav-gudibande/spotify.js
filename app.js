var lame = require('lame');
var Speaker = require('speaker');
var Spotify = require('spotify-web');
var username = "****";
var password = "****";
var Spotify = require('spotify-web');
var superagent = require('superagent');
var prompt = require("prompt");
var request = require('request');

var query = null;
var con = null;
var URI = null;

prompt.start();

prompt.get(["song"], function (err, result) {
  if (err) {
    return onErr(err);
  }
  query = result.song;
  play(query)
});

function onErr(err) {
  console.log(err);
  return l;
}

function play (query){
  Spotify.login(username, password, function (err, spotify) {
    if (err) throw err;
    var url = "https://api.spotify.com/v1/search?q="+query+"&type=track";
    request({
      url: url,
      json: true
    }, function (error, response, body) {
      if (error) {
        throw(error)
      } else {
        URI = body.tracks.items[2].uri;
        console.log("URI detected: "+URI);
        if(URI){
          spotify.get(URI, function (err, track) {
            if (err) throw err;
            console.log('Playing: %s - %s', track.artist[0].name, track.name);

            track.play()
            .pipe(new lame.Decoder())
            .pipe(new Speaker())
            .on('finish', function () {
              spotify.disconnect();
            });

          });
        }
      }
    });
  });
}
