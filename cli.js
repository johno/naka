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
    $ naka component <name> - Create a component
    $ naka container <name> - Create a container component
    $ naka action <name> - Create a action
    $ naka register <name> - Create a register
    $ naka serve - Serve the app
    $ naka test - Run the test suite
    $ naka build <options...> - Build the app

  Options
    --version, -v - Get the version of naka
    --help, -h - Get cli help

  Examples
    $ naka -h
    $ naka -v
    $ naka new awesome-app
    $ naka t
    $ naka action user
    $ naka component button
    $ naka build -prod
`, {
  alias: {
    h: 'help',
    v: 'version',
    prod: 'production',
    dev: 'development'
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

if (cmd === 'action' || cmd === 'reducer') {
  const name = cli.input[1]

	if (isBlank(name)) {
    console.error(`
      😕  no ${cmd} name was specified

      how about unicorn-cat? 🦄  😸
      $ naka ${cmd} unicorn-cat

      $ naka -h
    `)

    process.exit(1)
	}

  cpDir.sync(path.join(__dirname, `./generators/templates/${cmd}`), `${cmd}s/${name}`)
}
