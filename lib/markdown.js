'use strict';
var marked = require('marked');
var pinyin = require('pinyin');
var renderer = new marked.Renderer();
var hljs = require('highlight.js');
var babel = require('babel-core');
var File = require('vinyl');
// var fs = require('fs');
var sha1 = require('sha1');
var path = require('path');

var autoprefixer = require('./autoprefix');

var filename;
var mdFilepath
var jsFiles = [];

renderer.code = function(code, lang) {
  var renderHtml = '';
  var jsfilename = '';
  var ret = '';
  switch (lang) {
    case 'css':
      renderHtml = ('\n<style>' + autoprefixer(code) + '</style>\n');
      break;
    case 'html':
      renderHtml = '\n' + code + '\n';
      break;
    case 'js':
      var es5Code = babel.transform(code).code;
      jsfilename = filename + '-' + sha1(es5Code).substr(0, 10) + '.js';
      var jsfile = new File({
        contents: new Buffer(es5Code),
        path: path.dirname(mdFilepath) + '/' + jsfilename
      });

      jsFiles.push(jsfile)
      renderHtml = ('\n<!-- webpack bundle: ' + jsfilename + ' -->\n<script src="' + jsfilename + '"></script>\n');
      break;
  }
  if (lang && hljs.getLanguage(lang)) {
    try {
      ret += hljs.highlight(lang, code).value;
    } catch (__) {}
  } else {
    try {
      ret += hljs.highlightAuto(code).value;
    } catch (__) {}
  }
  var tag
  if (jsfilename) {
    tag = '<span class="code-type"><a href="' + jsfilename + '">' + lang + '</a></span>'
  } else {
    tag = '<span class="code-type">' + lang + '</span>'
  }

  ret = renderHtml + '<div class="highlight"><pre class="hljs">' + tag + '<code class="' + lang + '">' + ret + '</code></pre></div>';
  return ret; // use external default escaping
}
renderer.heading = function(text, level) {
  var escapedText = text.replace(/\s+/g, '-')
  escapedText = pinyin(escapedText, {
    style: pinyin.STYLE_NORMAL
  }).join('-');
  escapedText = escapedText.toLowerCase().replace(/[^\w]+/g, '-');
  escapedText = escapedText.replace(/^-+?|-+?$/, '');
  return '<h' + level + '>' + text + '<a name="' +
    escapedText +
    '" class="anchor" href="#' +
    escapedText +
    '"><span class="header-link">#</span></a></h' + level + '>';
}
renderer.link = function(href, title, text) {
  if (href.indexOf('http') === 0) {
    return '<a href="' + href + '" title="' + title + '">' + text + '</a>'
  }
  var fileindex = href.lastIndexOf('/')
  var filename = href.substr(fileindex + 1)
  if (/^([-\w]+)\.md$/.test(filename)) {
    href = href.replace(/\.md$/, '.html')
  }
  title = title || text;
  return '<a href="' + href + '" title="' + title + '">' + text + '</a>'
}

marked.setOptions({
  renderer: renderer
});

// var propertyReg = /(^\-{3}\n*)([^\1]+?)\n?\1/;
var titleReg = /^#([^\n]+)(?:#)?/

function formatMarkdown(str, pathname) {
  var title = '';
  title = titleReg.exec(str);
  title = title && title[1] || pathname;
  jsFiles = []
  var markdownHtml = marked(str);
  return {
    data: {
      title: title,
      content: markdownHtml
    },
    jsFiles: jsFiles
  };
}

module.exports = function(content, filepath) {
  // var content = fs.readFileSync(filepath, 'utf8');
  mdFilepath = filepath;
  filename = path.basename(filepath, '.md');
  var result = formatMarkdown(content, filename + '.md');
  return result;
};
