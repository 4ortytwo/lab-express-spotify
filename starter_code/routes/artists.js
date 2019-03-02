const express = require('express');
const router = express.Router();
// var bodyParser      = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
// router.use(bodyParser.urlencoded({ extended: false })) //don't forget to use this when using bodyParser


const clientId = '78849e8594f44ae8b33b719335b50324',
    clientSecret = 'be3368fead2f403fbae6d83ef83e1563';

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});

const isEmpty = val => val == null || !(Object.keys(val) || val).length;

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
    .then(data => {
        spotifyApi.setAccessToken(data.body['access_token']);
    })
    .catch(error => {
        console.log('Something went wrong when retrieving an access token', error);
    })

router.post('/', (req, res) => {

    spotifyApi.searchArtists(req.body.artistToFind)
        .then(data => {
            debugger

            console.log("The received data from the API: ", data.body);
            // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
            res.render('artists', {data});
        })
        .catch(err => {
            console.log("The error while searching artists occurred: ", err);
        })
    
})
router.get('/', (req, res) => {
    res.render('artists');
})



module.exports = router;