import test from 'ava'
import app from '../server/server'

test('loopback app should be something', t => {
  t.plan(1)
  t.truthy(app, 'app exists')
})
