const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const companyRoutes = require('./api/routes/companies');
const productRoutes = require('./api/routes/products');
const productTypeRoutes = require('./api/routes/product_types');
const countryRoutes = require('./api/routes/countries');
const cityRoutes = require('./api/routes/cities');
const provinceRoutes = require('./api/routes/provinces');
const categoryRoutes = require('./api/routes/categories');

//const neo4jRoutes = require('./api/neo4j-routes/neo4j-driver');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/companies', companyRoutes);
app.use('/products', productRoutes);
app.use('/product_types', productTypeRoutes);
app.use('/countries', countryRoutes);
app.use('/cities', cityRoutes);
app.use('/provinces', provinceRoutes);
app.use('/categories', categoryRoutes);

module.exports = app;