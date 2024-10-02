install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node/gendiff.js

stylish:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json

plain:
	node bin/gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npx jest

test-coverage:
	npx jest --coverage