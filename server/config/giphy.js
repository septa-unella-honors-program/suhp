var request = require('request');

module.exports = {

	welcomeEmailGif: function(req,res) {
	
		var url = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=welcome';
		request(url, function(err, response, body) {
			if (!err && response.statusCode == 200) {
            res.status(200).send(JSON.parse(body));
        } else {
            console.log('Error: ', err);
        }
		});
	}
}