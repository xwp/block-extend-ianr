# Block Scaffolding for WordPress

[![Build Status](https://travis-ci.com/xwp/block-scaffolding-wp.svg?branch=master)](https://travis-ci.com/xwp/block-scaffolding-wp)
[![Coverage Status](https://coveralls.io/repos/github/xwp/block-scaffolding-wp/badge.svg?branch=master)](https://coveralls.io/github/xwp/block-scaffolding-wp?branch=master)

## Notes from Ian Register

##### Currently abbreviated note form, to be edited.

Explain - I would update to use wp-scripts - Want add typescript - Use an asset file name thing - During an actual project or tasking would stick to the brief and time / effort estimate - Hmr because I’m a ui developer - Allowing multiple blocks as that’s generally how i’ve needed to set up for a UI build - working through the GB examples from core, and paragraph from Block library to learn from first principles - have refactored js directory to blocks directory as it contains styles and js - I would probably spend some time deciding whether to call the output directory dist or build, leaning towards dist as it would be built, commited and distributed vs if it is built via a CI process - would add a config.json (uncomitted) and a config.json.example comitted with settings picked up by webpack for hostnames/directory paths etc - test what sort of cache busting needed (note as components are cached in memory and re-register if they’re updated), and needs a means to loading on front end. - would create/update an .env variable or file so that php could pick up whether development mode was in just static/built local or running hmr - rename scripts to config so it doesn’t get confused with js - tried named and default exports for the save/edit - check function names show up in dev tools (ie from module exports ) - not testedd agaaint teh deprecated functions of p block-  added exit if accessed directly but generally have that disabled in nginx at server level- would look at the enqued vs register front / editor assets - experimenting with the styles hence the different css selectors targeting styles, really need more of a UI - errors if not running webpack in dev mode ie localhost webpack dev server in memory serving `blocks/dist/*` need to run webpack build to see front end updates and there may be invalidation of the block due to this, perhaps can fix with better management of when localhost vs actual hostname is used - icon is a bit large, would also like to test svgr to see if it converts svg to js component appropriately - use function names with upper or lower case ParagraphExtendAttributes etc - haven't done - do I need wp-data, wp-hooks in enqueue script? - where would an admin page to plugin go - i prefer putting stylelint, eslint settings in package.json to have less files in directory but am quite ambivalent because it's also nice have settings file if needing to modify tho i'd prefer all in json

Was trying to debug an error but it's present with all plugins disabled perhaps test if it's there when React not in development mode

Need to add documentation and linting, testing


##### Doc like this
/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
##### Assumptions
Need to ensure strings are translateable but not provide actual pot file / translation directories etc

Not counting heading block

###### Testing

Programmatic with jest/enzyme/phpunit but also user interactions add/remove blocks
Test for have 0 blocks and then multiples
Compatibility with older gutenberg or use of deprecations
Transforms (currently resets ordernumber to false transforming -> paragraph)
Test what happens with innerblocks

##### Why did I add restructure to include multiple blocks / mutiple files per block

Introduce least amount of boilerplate and not have to set up tests on every block for `registerBlockType`. Each block exports a `name` string and `settings` configuration object exactly as consumed by `registerBlockType`.

Multiple files per block easier to find, understand etc - but mainly as named exports show up better in devtools rather than showing as anonymous 

##### Why did I add restructure the plugin

Mostly to understand fully how it works.

Moved images and php directories into `resources` as those images would relate to the plugin whereas any images for the blocks would be in either the blocks directory or the individual block directories

Scripts I would consider renaming `config` so there's no confusion with thinking that it contains JS logic for the block or plugins (of course it contains JS in the webpack but that's not the point!)

##### Why did I add HMR

When properly configured HMR allows developers to make changes to a component file, save, and see that component update instantly on our webpage without disrupting any other application state, dramatically speeding up prototyping work and code iteration.

## Requirements

- WordPress 5.0+ or the [Gutenberg Plugin](https://wordpress.org/plugins/gutenberg/).
- PHP 7.2 or later, [Composer](https://getcomposer.org) and [Node.js](https://nodejs.org) for dependency management.
- [Docker](https://docs.docker.com/install/) or [Vagrant](https://www.vagrantup.com) with [VirtualBox](https://www.virtualbox.org) for a local development environment.

We suggest using a software package manager for installing the development dependencies such as [Homebrew](https://brew.sh) on MacOS:

	brew install php composer node docker docker-compose

or [Chocolatey](https://chocolatey.org) for Windows:

	choco install php composer node nodejs docker-compose


## Development

1. Clone the plugin repository.

2. Setup the development environment and tools using [Node.js](https://nodejs.org) and [Composer](https://getcomposer.org):

		npm install

	Note that both Node.js and PHP 7.2 or later are required on your computer for running the `npm` scripts. Use `npm run docker -- npm install` to run the installer inside a Docker container if you don't have the required version of PHP installed locally.

## Development Environment

This repository includes a WordPress development environment based on [Docker](https://docs.docker.com/install/) that can be run on your computer or inside a [Vagrant](https://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/) wrapper for network isolation and simple `.local` domain names.

### Using Vagrant

To use the Vagrant based environment, run:

	vagrant up

which will make it available at [block-scaffolding-wp.local](http://block-scaffolding-wp.local).

Use the included wrapper command for running scripts inside the Docker container running inside Vagrant:

	npm run vagrant -- npm run test:php

where `npm run test:php` is any of the scripts you would like to run.

Visit [block-scaffolding-wp.local:8025](http://block-scaffolding-wp.local:8025) to check all emails sent by WordPress.


### Using Native Docker

To use the Docker based environment with the Docker engine running on your host, run:

	docker-compose up -d

which will make it available at [localhost](http://localhost). Ensure that no other Docker containers or services are using port 80 on your machine. 

Use the included wrapper command for running scripts inside the Docker container:

	npm run docker -- npm run test:php

where `npm run test:php` is any of the scripts you would like to run.

Visit [localhost:8025](http://localhost:8025) to check all emails sent by WordPress.


### Scripts

We use `npm` as the canonical task runner for the project. Some of the PHP related scripts are defined in `composer.json`.

All of these commands can be run inside the Docker or Vagrant environments by prefixing the scripts with `npm run docker --` for Docker or with `npm run vagrant --` for Vagrant.

- `npm run build` to build the plugin JS and CSS assets. Use `npm run dev` to watch and re-build as you work.

- `npm run lint:js` to lint JavaScript files with [eslint](https://eslint.org/).

- `npm run lint:php` to lint PHP files with [phpcs](https://github.com/squizlabs/PHP_CodeSniffer).

- `npm run test:php` to run PHPUnit tests without generating a coverage report.

- `npm run test:php:coverage` to run PHPUnit tests and generate a coverage report in both XML Clover and HTML format.
