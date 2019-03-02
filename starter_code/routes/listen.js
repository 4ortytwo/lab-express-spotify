const express   = require('express');
const router    = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '78849e8594f44ae8b33b719335b50324',

    clientSecret = 'be3368fead2f403fbae6d83ef83e1563';

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
    .then(data => {
        spotifyApi.setAccessToken(data.body['access_token']);
    })
    .catch(error => {
        console.log('Something went wrong when retrieving an access token', error);
    })
// Retrieve tracks of an album

router.get('/:id', (req, res)=> {
    spotifyApi.getAlbumTracks(req.params.id, { limit : 5, offset : 1 })
      .then(function(data) {
          debugger
        console.log(data.body);
        res.render('listen', {data})
      }, function(err) {
        console.log('Something went wrong!', err);
      });

})

  module.exports = router;