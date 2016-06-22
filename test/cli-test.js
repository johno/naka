import test from 'ava'
import cp from 'child_process'
import isPresent from 'is-present'

test.cb('displays help', t => {
  t.plan(1)

  cp.execFile('../cli.js', ['-h'], (err, stdout, stderr) => {
    t.true(isPresent(stdout))
    t.end()
  })
})
