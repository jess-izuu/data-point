/* eslint-env jest */
'use strict'

const _ = require('lodash')
const utils = require('./index')

describe('utils.set', () => {
  const target = { b: 1 }
  test('sets value', () => {
    const r = utils.set(target, 'a', 'test')
    expect(r.a).toBe('test')
  })
  test('has no side effects', () => {
    utils.set(target, 'a', 'test')
    expect(target).toEqual({ b: 1 })
  })
})

describe('utils.assign', () => {
  const target = { a: 1, b: { b1: 1 } }
  const toMerge = { c: 1 }
  test('merges objects', () => {
    const r = utils.assign(target, toMerge)
    expect(r).toEqual({ a: 1, b: { b1: 1 }, c: 1 })
  })
  test('has no side effects', () => {
    utils.assign(target, toMerge)
    expect(target).toEqual({ a: 1, b: { b1: 1 } })
    expect(toMerge).toEqual({ c: 1 })
  })
})

describe('utils.getUID', () => {
  test('starts at 1', () => {
    const r = utils.getUID()
    expect(r).toBe(1)
  })
  test('starts at 1', () => {
    const r = utils.getUID()
    expect(r).toBeGreaterThan(0)
  })
})

describe('typeOf', () => {
  test('It should get undefined', () => {
    expect(utils.typeOf()).toEqual('undefined')
  })
  test('It should get null', () => {
    expect(utils.typeOf(null)).toEqual('null')
  })
  test('It should get string', () => {
    expect(utils.typeOf('s')).toEqual('string')
  })
  test('It should get boolean', () => {
    expect(utils.typeOf(false)).toEqual('boolean')
    expect(utils.typeOf(true)).toEqual('boolean')
  })
  test('It should get array', () => {
    expect(utils.typeOf([])).toEqual('array')
  })
  test('It should get object', () => {
    expect(utils.typeOf({})).toEqual('object')
  })
  test('It should get function', () => {
    expect(utils.typeOf(() => 1)).toEqual('function')
  })
})

describe('inspect', () => {
  let consoleInfo
  function getAcc () {
    const acc = {}
    _.set(acc, 'reducer.spec.id', 'test:test')
    _.set(acc, 'params.inspect', true)
    return acc
  }
  beforeAll(() => {
    consoleInfo = console.info
  })
  afterEach(() => {
    console.info = consoleInfo
  })
  test('It should log entityId', () => {
    console.info = jest.fn()
    utils.inspect(getAcc())
    expect(console.info.mock.calls[0]).toContain('test:test')
  })
  test('It should log data', () => {
    console.info = jest.fn()
    utils.inspect(getAcc(), { foo: 'bar' })
    expect(console.info.mock.calls[0]).toContain('\nfoo:')
    expect(console.info.mock.calls[0]).toContain('"bar"')
  })
  test('It should execute custom inspect if function', () => {
    console.info = jest.fn()
    const acc = getAcc()
    acc.params.inspect = () => console.info('baz')
    utils.inspect(acc)
    expect(console.info.mock.calls[1]).toContain('\ncustom:')
    expect(console.info.mock.calls[2]).toContain('baz')
  })
})
