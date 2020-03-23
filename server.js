//Install express server
const express = require('express');
const path = require('path');
const _ = require('lodash');
const app = express();

const dataSet = [
	{
		name: "Mohit Kadel",
		email: "er.mohitkadel@gmail.com",
		lowest_price: 1,
		rating: 5,
		max_speed: 100,
		description: "Test Description",
		contact_number: "7976331885",
		image: "https://pbs.twimg.com/profile_images/1053055123193122816/IUwo6l_Q_400x400.jpg",
		url: "https://pbs.twimg.com/profile_images/1053055123193122816/IUwo6l_Q_400x400.jpg" 
	},
	{
		name: "Vegeta",
		email: "Vegeta@gmail.com",
		lowest_price: 2,
		rating: 4,
		max_speed: 90,
		description: "Test Description",
		contact_number: "9876543210",
		image: "https://www.anime-planet.com/images/characters/vegeta-2186.jpg",
		url: "https://www.anime-planet.com/images/characters/vegeta-2186.jpg" 
	},
	{
		name: "Whis",
		email: "Whis@gmail.com",
		lowest_price: 3,
		rating: 4,
		max_speed: 100,
		description: "Test Description",
		contact_number: "9876543210",
		image: "https://vignette.wikia.nocookie.net/dragonball/images/d/da/WhisU7.png/revision/latest?cb=20170629161500",
		url: "https://vignette.wikia.nocookie.net/dragonball/images/d/da/WhisU7.png/revision/latest?cb=20170629161500" 
	},
	{
		name: "Beerus",
		email: "Beerus@gmail.com",
		lowest_price: 3,
		rating: 4,
		max_speed: 80,
		description: "Test Description",
		contact_number: "9876543210",
		image: "https://vignette.wikia.nocookie.net/dragonball/images/a/a1/D55441a44d4a7243e3433338cdc00243.jpg/revision/latest?cb=20150920210534",
		url: "https://vignette.wikia.nocookie.net/dragonball/images/a/a1/D55441a44d4a7243e3433338cdc00243.jpg/revision/latest?cb=20150920210534" 
	},
	{
		name: "Freeza",
		email: "Freeza@gmail.com",
		lowest_price: 3,
		rating: 4,
		max_speed: 70,
		description: "Test Description",
		contact_number: "9876543210",
		image: "https://www.screenja.com/static/img/thumbs/frieza-dbz-normal-636.png",
		url: "https://www.screenja.com/static/img/thumbs/frieza-dbz-normal-636.png" 
	}
]

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/frontend'));

const routes = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/frontend/index.html'));
});

routes.get('/', function(req, res) {
	let params = req.query;
	let dataPipeline = Object.assign({}, dataSet);

	if(Object.keys(params).length) {

		// Search
		for(let param in params) {
			if(Object.keys(dataPipeline[0]).indexOf(param) >= 0) {
				dataPipeline = _.filter(dataPipeline, (o) => {
									let re = new RegExp(params[param], "i");
									return re.test(o[param]);
								});
			}
		}

		// Sort
		if(params.sort) {
			if(params.sort.indexOf("-") >= 0) {
				let field = params.sort.split("-")[1];
				dataPipeline = _.sortBy(dataPipeline, [field]).reverse();
			}
			else {
				dataPipeline = _.sortBy(dataPipeline, [params.sort]);
			}
		}
	}
	res.status(200).send(dataPipeline);
});



app.use('/api', routes);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);