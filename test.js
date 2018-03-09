var test = require('tape')
var jsdom
var HTMLElement = require('./node_modules/jsdom-wc/lib/jsdom/living/generated/HTMLElement.js')

test('jsdom', function (t) {
  jsdom = require('./index')()
  t.end()
})

test('dom', function (t) {
  var div = document.createElement('div')
  div.innerHTML = 'hello'
  document.body.appendChild(div)
  t.equal(document.querySelector('body').innerHTML, '<div>hello</div>', 'dom works')
  t.end()
})

test('window', function (t) {
  t.ok(typeof window !== 'undefined', 'window exists')
  t.ok(typeof window.customElements !== 'undefined', 'customElements exists')
  t.ok(typeof window.customElements.define === 'function', 'can define custom elements')
  t.end()
})

test('customElement', function (t) {
  window.customElements.define('test', HTMLElement.interface)
  var myTag = document.createElement('test')
  t.ok(typeof myTag !== 'undefined', 'custom element is defined')
  t.end()
})

test('cleanup', function (t) {
  jsdom()
  t.ok(typeof global.document === 'undefined', 'cleaned document')
  t.ok(typeof global.alert === 'undefined', 'cleaned alert')
  t.end()
})
