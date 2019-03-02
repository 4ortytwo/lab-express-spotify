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

// router.get('/', (req, res)=> {
//     res.render('albums');
// })

router.get('/:id', (req, res, next) => {
    // .getArtistAlbums() code goes here
    spotifyApi.getArtistAlbums(req.params.id)
        .then(function (data) {
            console.log('Artist albums', data.body);
            debugger
            res.render('albums', {data})
        }, function (err) {
            console.error(err);
        });
});

module.exports = router;