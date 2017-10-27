const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations'); //dboperations
const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, db) => {
	assert.equal(err,null);

	console.log('Connected correctly to server.');

	dboper.insertDocument(db, {name: "VaDonut", description: "Test donut"},
	 "dishes", (result)=>{
		console.log("Inset Document:\n", result.ops);

		dboper.findDocuments(db, "dishes", (docs) => {
			console.log("Found Documents:\n", docs);

			dboper.updateDocument(db, {name: "VaDonut"},
		 		{description: "Updated Test Donut"}, "dishes", (result)=>{
					console.log("Updated Document:\n", result.result);

					dboper.findDocuments(db, "dishes", (docs) => {
						console.log("Found Update Documents:\n", docs);

						db.dropCollection("dishes", (result)=>{
							console.log("Dropped collection: ", result);

							db.close();
						});
					});
				});
		});
	});
});
