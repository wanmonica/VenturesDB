var express = require('express');
var app = express();
var fs = require("fs");
var neo4j = require('neo4j-driver').v1;


app.get('/product_types2', function (req, res) {
	var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("admin", "admin"));
	var session = driver.session();

var readTxResultPromise = session.readTransaction(function (transaction) {
  // used transaction will be committed automatically, no need for explicit commit/rollback
 
  var result = transaction.run('MATCH (product_type:Product_Type) RETURN product_type.type_name AS name');
  // at this point it is possible to either return the result or process it and return the
  // result of processing it is also possible to run more statements in the same transaction
  return result;
});
 
// returned Promise can be later consumed like this:
readTxResultPromise.then(function (result) {
  session.close();
  console.log(result.records);
  //res.end(result.records);
}).catch(function (error) {
  console.log(error);
});
 
// It is possible to execute write transactions that will benefit from automatic retries
// on both single instance ('bolt' URI scheme) and Causal Cluster ('bolt+routing' URI scheme)
var writeTxResultPromise = session.writeTransaction(function (transaction) {
  // used transaction will be committed automatically, no need for explicit commit/rollback
 
  var result = transaction.run('MERGE (alice:Person {name : \'Alice\' }) RETURN alice.name AS name');
  // at this point it is possible to either return the result or process it and return the
  // result of processing it is also possible to run more statements in the same transaction
  return result.records.map(function (record) {
    return record.get('name');
  });
});
 
// returned Promise can be later consumed like this:
writeTxResultPromise.then(function (namesArray) {
  session.close();
  console.log(namesArray);
}).catch(function (error) {
  console.log(error);
});

})

app.get('/product_types', function (req, res) {
	var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("admin", "admin"));
	var session = driver.session();
	var Product_Type = [];
	
	session
	  .run('MATCH (product_type:Product_Type) RETURN product_type.id AS id, product_type.type_name AS name')
	  .subscribe({
		onNext: function (record) {
		  //console.log(JSON.parse(record.get('name')));
		  var name = record.get('name');
		  var id = record.get('id');
		  
		  Product_Type.push({ id: id, type_name: name });
		  res.contentType('application/json');
		  console.log(JSON.stringify(Product_Type));
		  res.send(JSON.stringify(Product_Type));
		},
		onCompleted: function () {
		  session.close();
		},
		onError: function (error) {
		  console.log(error);
		}
	  });

	
	
	  
	  
	
	/*
	var readTxResultPromise = session.readTransaction(function (transaction) {
 
		  var result = transaction.run('MATCH (product_type:Product_Type) RETURN product_type.type_name AS name');

		  console.log( JSON.parse(result) );
		  

	});*/
	
   /*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       res.end( data );
   });*/
   
   
})

app.get('/listUsers124', function (req, res) {
var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("admin", "admin"));
var session = driver.session();

fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       res.end( data );
   });

var readTxResultPromise = session.readTransaction(function (transaction) {
 
  var result = transaction.run('MATCH (product_type:Product_Type) RETURN product_type.type_name AS name');

  return result;
});
readTxResultPromise.then(function (result) {
  session.close(); 


  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       res.end( data );
   });
   
  //res.end(  JSON.parse( result ));
 
}).catch(function (error) {

});






driver.close();
  res.end(  JSON.stringify( readTxResultPromise ));
//res.end( readTxResultPromise );

})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("hosting:  http://%s:%s", host, port)

})

/*
readTxResultPromise.then(function (result) {
  session.close();
  console.log(result.records);
}).catch(function (error) {
  console.log(error);
});*/

