#!/usr/bin/env node

const meow = require('meow')
const exec = require('child_process').exec
const cpDir = require('copy-dir')
const isBlank = require('is-blank')
const path = require('path')
const budo = require('budo')
const fs = require('fs')

const cli = meow(`
  ✨ ✨ ✨ 

  Usage
    $ naka <command> <options...>

  Commands
    $ naka new <name> - Create a new app
    $ naka model <name> - Create a model
    $ naka component <name> - Create a component
    $ naka serve - Serve the app
    $ naka test - Run the test suite
    $ naka build <options...> - Build the app

  Examples
    $ naka -h
    $ naka new awesome-app
    $ naka t
    $ naka model user
    $ naka component button
    $ naka build -prod
`, {
  alias: {
    h: 'help',
    t: 'test',
    g: 'generate',
    prod: 'production',
    dev: 'development',
    w: 'watch'
  }
})

const cmd = cli.input[0]

if (isBlank(cmd)) {
  console.error(`
    😔  no command specified

    $ naka -h
  `)

  process.exit(1)
}

if (cmd === 'serve') {
  console.log(`
🎉 🎉 🎉  - naka serve
      
 ---
`)

  budo('index.js', {
    live: true,
    port: 1234,
    livePort: 4321,
    stream: process.stdout
  })
}

if (cmd === 'test') {
  exec('ava **/**/*-test.js -v', (err, stdout, stderr) => {
    if (err) {
      throw err
    }

    if (stderr) {
      console.error(stderr)
    }

    console.log(stdout)
  })
}

if (cmd === 'hi') {
  console.log('hey back! 👬 ')
  process.exit(0)
}

if (cmd === 'fuck') {
  console.log('💩 💩 💩 ')
  process.exit(0)
}

const mkdir = (name, cmd) => {
  try {
    fs.mkdirSync(name)
  } catch (e) {
    if (e.code === 'EEXIST') {
      console.error(`🙅 🙅 🙅  naka could not create a ${cmd} there, ${name} already exists`)
			process.exit(1)
    } else {
      throw e
    }
  }
}

if (cmd == 'new') {
  const projName = cli.input[1]

	if (isBlank(projName)) {
    console.error(`
      😕  no project name was specified

      how about unicorn-cat? 🦄  😸
      $ naka new unicorn-cat

      $ naka -h
    `)

    process.exit(1)
	}

	mkdir(projName, cmd)
  cpDir.sync(path.join(__dirname, './generators/templates/new'), projName)
}

if (cmd == 'model') {
  const modelName = cli.input[1]

	if (isBlank(modelName)) {
    console.error(`
      😕  no model name was specified

      how about unicorn-cat? 🦄  😸
      $ naka model unicorn-cat

      $ naka -h
    `)

    process.exit(1)
	}

  cpDir.sync(path.join(__dirname, './generators/templates/model'), `models/${modelName}`)
}
