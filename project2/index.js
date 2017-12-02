var express = require('express');
var app = express();
var url = require('url');
var pg = require("pg"); // This is the postgres database connection module.
const connectionString = "postgres://postgres:gpsa3354@localhost:5432";

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));



// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/register', function(request, response) {
  login(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function register(request, response) {

  var requestUrl = url.parse(request.url, true);
  //parent's first and last name
  var pfname = requestUrl.query.pfname;
  var plname = requestUrl.query.plname;
  //child's first and last name
  var cfname = requestUrl.query.pfname;
  var clname = requestUrl.query.plname;

  var email = requestUrl.query.email;
  var phone = requestUrl.query.phone;

  insertRegistration(requestUrl, function(error, result) {
		// This is the callback function that will be called when the DB is done.
		// The job here is just to send it back.

		// Make sure we got a row with the reg info, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var regInfo = result[0];
			response.status(200).json(result[0]);
		}
	});

  // Set up a JSON object of the values we want to pass along to the EJS result page
	var params = {pfname: pfname, plname: plname, cfname: cfname, clname: clname, email: email, phone: phone};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/register', params);

  return weight
};

function insertRegistration(requestUrl, callback) {
	console.log("inserting " + requestUrl.pfname + " " + requestUrl.plname);

	var client = new pg.Client(connectionString);

	client.connect(function(err) {
		if (err) {
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}

		var sql = "SELECT * from parent";
		var params = [id];

		var query = client.query(sql, params, function(err, result) {
			// we are now done getting the data from the DB, disconnect the client
			client.end(function(err) {
				if (err) throw err;
			});

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			console.log("Found result: " + JSON.stringify(result.rows));

			// call whatever function the person that called us wanted, giving it
			// the results that we have been compiling
			callback(null, result.rows);
		});
	});

} // end of getPersonFromDb