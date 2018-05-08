const express = require('express');
const router = express.Router();
const neo4j = require('neo4j-driver').v1;


router.get('/', (req, res, next) => {
    var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("admin", "admin"));
    var session = driver.session();
});

module.exports = router;