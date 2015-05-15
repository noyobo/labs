'use strict';
var marked = require('marked');
var pinyin = require("pinyin")
var renderer = new marked.Renderer();
var hljs = require('highlight.js');

var fs = require('fs');
var path = require('path');

var renderHtml = '';

renderer.code = function(code, lang) {
  var ret = '';
  switch (lang) {
    case 'css':
      renderHtml += ('<style>' + code + '</style>');
      break;
    case 'html':
      renderHtml += code;
      break;
    case 'js':
      renderHtml += ('<script>' + code + '</script>');
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
  ret = '<div class="highlight"><pre class="hljs"><span class="code-type">' + lang + '</span><code class="' + lang + '">' + ret + '</code></pre></div>';
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

var propertyReg = /(^\-{3}\n*)([^\1]+?)\n?\1/;
var titleReg = /^#([^\n]+)(?:#)?/

function formatMarkdown(str, pathname) {
  var title = '';
  renderHtml = '';
  title = titleReg.exec(str);
  title = title && title[1] || pathname;
  var markdownHtml = marked(str);
  return {
    title: title,
    content: renderHtml + markdownHtml
  };
}

module.exports = function(content, filepath) {
  // var content = fs.readFileSync(filepath, 'utf8');
  var result = formatMarkdown(content, path.basename(filepath));
  return result;
};
