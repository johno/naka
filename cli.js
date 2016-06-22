#!/usr/bin/env node

const meow = require('meow')
const cpDir = require('copy-dir')
const isBlank = require('is-blank')
const path = require('path')
const fs = require('fs')

const cli = meow(`
  Usage
    $ naka <command> <options...>

  Commands
    $ naka new <name> - Create a new app
    $ naka generate <blueprint> - Item to generate
    $ naka serve - Serve the app
    $ naka test - Run the test suite
    $ naka build <options...> - Build the app

  Examples
    $ naka -h
    $ naka new awesome-app
    $ naka t
    $ naka generate model user
    $ naka build -prod
`, {
  alias: {
    h: 'help',
    t: 'test',
    g: 'generate',
    prod: 'production',
    dev: 'development'  
  }
})

const cmd = cli.input[0]

if (isBlank(cmd)) {
  console.error(`
    no command specified

    $ naka -h
  `)

  process.exit(1)
}

if (cmd == 'new') {
  const projName = cli.input[1]

	if (isBlank(projName)) {
    console.error(`
      no project name was specified

      $ naka -h
    `)

    process.exit(1)
	}

	mkdir(projName)
  cpDir('./generators/templates/new', projName)
}

const mkdir = name => {
  try {
    fs.mkdirSync(name)
  } catch (e) {
    if (e.code === 'EEXIST') {
      console.error(`naka could not create a project there, ${name} already exists`)
			process.exit(1)
    } else {
      throw e
    }
  }
}
