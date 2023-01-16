const listHelper = require('../utils/list_helper')
const testHelpers = require('./test_helpers')

describe('total likes', () => {

  it('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  it('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelpers.blog)
    expect(result).toBe(5)
  })

  it('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testHelpers.blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  it('of empty array', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(undefined)
  })

  it('of array of length of one', () => {
    const result = listHelper.favoriteBlog(testHelpers.blog)
    expect(result).toEqual(testHelpers.blog[0])
  })

  it('of larger array', () => {
    const result = listHelper.favoriteBlog(testHelpers.blogs)
    expect(result).toEqual(testHelpers.blogs[2])
  })

  it('of multiple equally liked', () => {
    const newList = [...testHelpers.blogs]
    newList[1] = { ...newList[1], likes: 12 }
    const result = listHelper.favoriteBlog(newList)
    expect(result).toEqual(newList[1])
  })

})

describe('most blogs', () => {
  it('of empty array', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(undefined)
  })

  it('of array of length of one', () => {
    const result = listHelper.mostBlogs(testHelpers.blog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  it('of larger array', () => {
    const result = listHelper.mostBlogs(testHelpers.blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })

  it('of multiple equally written', () => {
    const newList = [...testHelpers.blogs, testHelpers.blogs[1]]
    const result = listHelper.mostBlogs(newList)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 3 })
  })
})

describe('most likes', () => {
  it('of empty array', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(undefined)
  })

  it('of array of length of one', () => {
    const result = listHelper.mostLikes(testHelpers.blog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  it('of larger array', () => {
    const result = listHelper.mostLikes(testHelpers.blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })

  it('of multiple equally many likes', () => {
    const newList = [...testHelpers.blogs]
    newList[0] = {...newList[0], likes: 17}
    const result = listHelper.mostLikes(newList)
    expect(result).toEqual({ author: 'Michael Chan', likes: 17 })
  })
})