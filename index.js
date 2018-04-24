'use strict';

var util = require('util');
var Undertaker = require('undertaker');
var vfs = require('vinyl-fs');
var watch = require('glob-watcher');
var Crawler = require("crawler");
var jsdom = require('jsdom');
var Nightmare = require('nightmare')
var cheerio=require("cheerio");
var fs = require('fs');
var r=require("request");


var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("admin", "admin"));

var session = driver.session();



 


var nightmare = Nightmare({ show:false, maxAuthRetries: 3 })

function Gulp() {
  Undertaker.call(this);
  this.watch = this.watch.bind(this);
  this.task = this.task.bind(this);
  this.series = this.series.bind(this);
  this.parallel = this.parallel.bind(this);
  this.registry = this.registry.bind(this);
  this.tree = this.tree.bind(this);
  this.lastRun = this.lastRun.bind(this);
}

util.inherits(Gulp, Undertaker);
Gulp.prototype.src = vfs.src;
Gulp.prototype.dest = vfs.dest;
Gulp.prototype.symlink = vfs.symlink;
Gulp.prototype.watch = function(glob, opt, task) {
  if (typeof opt === 'string' || typeof task === 'string' ||
    Array.isArray(opt) || Array.isArray(task)) {
    throw new Error('watching ' + glob + ': watch task has to be ' +
      'a function (optionally generated by using gulp.parallel ' +
      'or gulp.series)');
  }

  if (typeof opt === 'function') {
    task = opt;
    opt = {};
  }

  opt = opt || {};

  var fn;
  if (typeof task === 'function') {
    fn = this.parallel(task);
  }

  return watch(glob, opt, fn);
};

Gulp.prototype.Gulp = Gulp;

var inst = new Gulp();
module.exports = inst;



var testurl="32786489";

var website="https://www.itjuzi.com/company/"+testurl;


  var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();

var datestring= curr_year.toString()+curr_month.toString()+curr_date.toString();


nightmare
  .goto(website)
 .wait('.seo-important-title')
.evaluate(function(){

    return document.body.innerHTML;


}) .end().then(function (body) {
    //  cheerio.load(html);
		
   var $ =  cheerio.load(body);
   

console.log($(".seo-important-title").attr('data-name'));
console.log($(".introduction").text());

const companyName = $(".seo-important-title").attr('data-name');
const companyFullName = $(".seo-important-title").attr('data-fullname');
const introduction = $(".introduction").text();

const resultPromise = session.run(
  'CREATE (a:Company {companyName: $companyName, companyFullName:$companyFullName,introduction:$introduction}) RETURN a',
  {companyName: companyName,companyFullName: companyFullName,introduction:introduction}
);

resultPromise.then(result => {
  session.close();

  const singleRecord = result.records[0];
  const node = singleRecord.get(0);

  console.log(node.properties.companyName);
 console.log(node.properties.companyFullName);
 console.log(node.properties.introduction);
  // on application exit:
  driver.close();
});

		
fs.writeFile("./sitelog/"+testurl+datestring+".txt",body , function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
		

    })
  .catch(error => {
    console.error('Search failed:', error)
  })

