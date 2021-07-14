const { TestWatcher } = require('jest')
const {palindrome} = require('../utils/for-testing')

test('palindromo de Fer', () => {
  const result = palindrome('fercode')

  expect(result).toBe('edocref')
})

test('palindromo de undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})

