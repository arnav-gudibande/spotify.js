var xml2js = require('xml2js');
var Spotify = require('spotify-web');
var superagent = require('superagent');
var prompt = require("prompt");
var request = require('request');

var query = null;
var con = null;

prompt.start();

prompt.get(["song"], function (err, result) {
  if (err) {
    return onErr(err);
  }
  query = result.song;
  con = true;
});

function onErr(err) {
  console.log(err);
  return l;
}

Spotify.login("arnav.gudibande", "2011Veyron", function (err, spotify) {
  if(con){
    if (err) throw err;
    var url = "https://api.spotify.com/v1/search?q="+query+"&type=track";
    request({
      url: url,
      json: true
    }, function (error, response, body) {
      if (error) {
        throw(error)
      } else {
        var URI = body.tracks.items[2].uri;
        console.log(URI);
      }
    });
  }
});
