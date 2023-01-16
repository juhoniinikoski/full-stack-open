const mongoose = require('mongoose')
const supertest = require('supertest')
const testHelpers = require('./test_helpers')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelpers.blogs)
})

afterAll(() => {
  mongoose.connection.close()
})

describe('fetching bloglist', () => {
  it('returns all blog posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(testHelpers.blogs.length)
  })

  it('has transformed _ids to ids', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe('adding a post', () => {
  it('adds one blog with likes defined', async () => {
    const initialBlogs = await api.get('/api/blogs')

    const newBlog = {
      title: 'Test blog',
      author: 'Test user',
      likes: 2,
      url: 'testurl.com'
    }
    await api
      .post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('content-Type', /application\/json/)

    const resultBlogs = await api.get('/api/blogs')
    expect(resultBlogs.body.length).toEqual(initialBlogs.body.length + 1)
    expect(resultBlogs.body[resultBlogs.body.length - 1].likes).toEqual(2)
  })

  it('adds one blog without likes defined', async () => {
    const initialBlogs = await api.get('/api/blogs')

    const newBlog = {
      title: 'Test blog',
      author: 'Test user',
      url: 'testurl.com'
    }
    await api
      .post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('content-Type', /application\/json/)

    const resultBlogs = await api.get('/api/blogs')
    expect(resultBlogs.body.length).toEqual(initialBlogs.body.length + 1)
    expect(resultBlogs.body[resultBlogs.body.length - 1].likes).toEqual(0)
  })

  it('throws an error if no title or url is given', async () => {
    const initialBlogs = await api.get('/api/blogs')

    const newBlog = {
      author: 'Test user',
      url: 'testurl.com'
    }

    const newBlog2 = {
      title: 'Test blog',
      author: 'Test user',
    }

    await api
      .post('/api/blogs').send(newBlog)
      .expect(400)

    await api
      .post('/api/blogs').send(newBlog2)
      .expect(400)

    const resultBlogs = await api.get('/api/blogs')
    expect(initialBlogs.body.length).toEqual(resultBlogs.body.length)
  })
})

describe('updating blogs', () => {
  it('updates number of likes of the blog', async () => {
    const initialBlog = (await testHelpers.blogsInDb())[0]

    await api
      .put(`/api/blogs/${initialBlog.id}`)
      .send({ likes: 12 })
      .expect(200)

    const resultBlog = (await testHelpers.blogsInDb())[0]

    expect(initialBlog.likes).not.toEqual(resultBlog.likes)
    expect(resultBlog.likes).toEqual(12)
  })
})

describe('deletion of blog post', () => {
  it('succeeds with status code 204 if id is valid', async () => {
    const initialBlogs = await testHelpers.blogsInDb()
    const blogToDelete = initialBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const resultBlogs = await testHelpers.blogsInDb()

    expect(resultBlogs).toHaveLength(
      initialBlogs.length - 1
    )

    const ids = resultBlogs.map(r => r.id)

    expect(ids).not.toContain(blogToDelete.id)
  })

  it('throws 400 if blog with given id doesnt exist', async () => {
    const initialBlogs = await testHelpers.blogsInDb()

    await api
      .delete('/api/blogs/123456')
      .expect(400)

    const resultBlogs = await testHelpers.blogsInDb()

    expect(resultBlogs).toHaveLength(
      initialBlogs.length
    )
  })
})