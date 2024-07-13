const { sortPages } = require('./report')

const { test, expect } = require('@jest/globals')

test('sort 2 pages', () => {
    const input = {
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev/path2': 22,
        'https://wagslane.dev/path4': 5,
        'https://wagslane.dev/path3': 10
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path2', 22],
        ['https://wagslane.dev/path3', 10],
        ['https://wagslane.dev/path4', 5],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]

    expect(actual).toEqual(expected)
})

test('sort 5 pages', () => {
    const input = {
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path': 1
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]

    expect(actual).toEqual(expected)
})