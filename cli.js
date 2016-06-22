#!/usr/bin/env node

const meow = require('meow')

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
