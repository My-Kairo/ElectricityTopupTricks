const express = require('express');
const exphbs  = require('express-handlebars');
const pg = require('pg');
const Pool = pg.Pool;

const app = express();
const PORT =  process.env.PORT || 3011;

const ElectricityMeters = require('./electricity-meters');

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/topups_db';

const pool = new Pool({
    connectionString  
});

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const electricityMeters = ElectricityMeters(pool);

app.get('/', function(req, res) {
	res.redirect('/streets');
});

app.get('/streets', async function(req, res, next) {
	try {
		const streets = await electricityMeters.streets();
	console.log(streets);
	res.render('streets', {
		streets
	});

	}catch (error){
		next(error)
	}
});

app.get('/streets', async function(req, res){
	const appl = await electricityMeters.appliances();
	console.log(appl);
	res.render('appliances',{
		appliances
	});
});

app.get('/appliances', async function(req, res){
	res.render('appliances')
})

app.get('/meter/:street_id', async function(req, res) {
	const meters = await electricityMeters.streetMeters();
	console.log(meters);
	const mtr = req.params.street_id;

	// use the streetMeters method in the factory function...
	// send the street id in as sent in by the URL parameter street_id - req.params.street_id

	// create  template called street_meters.handlebars
	// in there loop over all the meters and show them on the screen.
	// show the street number and name and the meter balance

	res.render('street_meters', {
		meters
	});
});

app.get('/meter/use/:meter_id', async function(req, res) {

	// show the current meter balance and select the appliance you are using electricity for
	res.render('use_electicity', {
		meters
	});
});

app.post('/meter/use/:meter_id', async function(req, res) {

	// update the meter balance with the usage of the appliance selected.
	res.render(`/meter/user/${req.params.meter_id}`);

});

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});