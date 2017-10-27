const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations'); //dboperations
const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url).then((db) => {

	console.log('Connected correctly to server.');

	dboper.insertDocument(db, {name: "VaDonut", description: "Test donut"}, "dishes")
	 .then((result)=>{
			console.log("Inset Document:\n", result.ops);

			dboper.findDocuments(db, "dishes");
		})
		.then((docs) => {
			console.log("Found Documents:\n", docs);

			return dboper.updateDocument(db, {name: "VaDonut"},
		 		{description: "Updated Test Donut"}, "dishes");
		})
		.then((result) => {
			console.log("Updated Document:\n", result.result);

			return dboper.findDocuments(db, "dishes");
		})
		.then((docs) => {
			console.log("Found Update Documents:\n", docs);

			return db.dropCollection("dishes");
		})
		.then((result) => {
				console.log("Dropped collection: ", result);

				return db.close();
		})
		.catch((err) => console.log(err));

}, (err) => {console.log(err)})
.catch((err) => console.log(err));
