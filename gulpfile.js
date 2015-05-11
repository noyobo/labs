'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var map = require('map-stream');
var markdown = require('./lib/markdown.js');
var render = require('./lib/xtpl.js');

var path = require('path');
var fs = require('fs');

var mdList = [];
var mdToHtml = map(function(file, done) {
  var mdData = markdown(String(file.contents), file.path);
  var html = render(mdData, 'example');
  var relativePath = path.relative(process.cwd(), file.path);

  mdList.push({
    url: relativePath.replace(/\.md$/, '.html'),
    title: mdData.title
  })
  file.contents = new Buffer(html);
  return done(null, file)
})

gulp.task('md', function() {
  return gulp
    .src(['./**/*.md', '!./node_modules/**/*.md', '!README.md'])
    .pipe(mdToHtml)
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('./'))
    .on('end', function() {
      var listHtml = render({
        list: mdList
      })
      fs.writeFileSync('index.html', listHtml, 'utf-8');
    })
})

gulp.task('default', function() {
  gulp.start(['md'])
})
