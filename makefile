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
	npm run site && git add . -A && git commit -m 'update' && ggpush && npm run ghpages
