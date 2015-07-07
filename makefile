push:
	npm run ghpages

site:
	npm run site

watch:
	gulp watch

md:
	gulp md

js:
	gulp js

publish:
	npm run site && git add . -A && git commit -m 'update' && git push origin master && npm run ghpages
