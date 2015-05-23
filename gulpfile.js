'use strict';

var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var watch = require('gulp-watch');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var through2 = require('through2');
var babel = require('babel-core');
var colors = require('colors-mini');
var markdown = require('./lib/markdown.js');
var render = require('./lib/xtpl.js');

var path = require('path');
var fs = require('fs');
var distDir = './_site';

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
  console.log(colors.green('create html:'), file.path);
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
    .pipe(gulp.dest(distDir))
    .on('end', function() {
      var listHtml = render({
        list: mdList
      })
      fs.writeFileSync('./_site/index.html', listHtml, 'utf-8');
    })
})

gulp.task('webpack', ['md'], function(done) {
  return gulp
    .src(distDir + '/examples/*.js')
    .pipe(named())
    .pipe(webpack())
    .pipe(gulp.dest(distDir + '/examples'))
})

gulp.task('assets', function() {
  return gulp
    .src(['./src/**/*.css'])
    .pipe(copy(distDir, {
      prefix: 1
    }))
})

var es6ToEs5 = through2.obj(function(file, env, done) {
  var code = String(file.contents);
  var es5 = babel.transform(code).code;
  file.contents = new Buffer(es5);
  console.log(colors.green('create js:'), file.path);
  done(null, file)
})

gulp.task('js', function() {
  return gulp
    .src(['./src/**/*.js'])
    .pipe(es6ToEs5)
    .pipe(gulp.dest('./_site/'))
})

gulp.task('del', function(done) {
  del(distDir, function() {
    done()
  })
})

gulp.task('watch', function() {

  watch(['./**/*.md', '!./node_modules/**/*.md', '!README.md'])
    .pipe(mdToHtml)
    .pipe(gulp.dest(distDir))

  watch(['./assets/**/*.js'])
    .pipe(es6ToEs5)
    .pipe(gulp.dest('./_site/assets/'))
})

gulp.task('default', ['del'], function() {
  gulp.start(['webpack', 'assets', 'js'])
})
