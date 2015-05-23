'use strict';

var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var watch = require('gulp-watch');
var map = require('map-stream');
var through2 = require('through2');
var babel = require('babel-core');
var markdown = require('./lib/markdown.js');
var render = require('./lib/xtpl.js');

var path = require('path');
var fs = require('fs');

var mdList = [];

var mdToHtml = through2.obj(function(file, enc, done) {
  var self = this;
  var mdData = markdown(String(file.contents), file.path);
  var html = render(mdData.data, 'example');

  file.path = file.path.replace(/\.md$/, '.html')
  var relativePath = path.relative(process.cwd(), file.path);
  mdList.push({
    url: relativePath,
    title: mdData.data.title
  })
  file.contents = new Buffer(html);
  console.log('create html file for:', file.path);
  self.push(file)
  while (mdData.jsFiles.length > 0) {
    var jsfile = mdData.jsFiles.pop();
    self.push(jsfile)
  }
  done()
})

gulp.task('md', function() {
  return gulp
    .src(['./**/*.md', '!./node_modules/**/*.md', '!README.md'])
    .pipe(mdToHtml)
    .pipe(gulp.dest('./_site'))
    .on('end', function() {
      var listHtml = render({
        list: mdList
      })
      fs.writeFileSync('./_site/index.html', listHtml, 'utf-8');
    })
})

gulp.task('assets', function() {
  return gulp
    .src(['./src/**/*.css'])
    .pipe(copy('./_site', {
      prefix: 1
    }))
})

var es6ToEs5 = map(function(file, done) {
  var code = String(file.contents);
  var es5 = babel.transform(code).code;
  file.contents = new Buffer(es5);
  console.log('create js file for:', file.path);
  return done(null, file)
})

gulp.task('js', function() {
  return gulp
    .src(['./src/**/*.js'])
    .pipe(es6ToEs5)
    .pipe(gulp.dest('./_site/'))
})

gulp.task('del', function(done) {
  del('./_site', function() {
    done()
  })
})

gulp.task('watch', function() {
  watch(['./**/*.md', '!./node_modules/**/*.md', '!README.md'])
    .pipe(mdToHtml)
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('./_site'))

  watch(['./assets/**/*.js'])
    .pipe(es6ToEs5)
    .pipe(gulp.dest('./_site/assets/'))
})

gulp.task('default', ['del'], function() {
  gulp.start(['md', 'assets', 'js'])
})
