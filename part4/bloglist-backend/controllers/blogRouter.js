const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = require('express').Router()

blogRouter.get('/', async (_req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 }) // don't want to show all blogs here
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', { name: 1, username: 1 })
  res.json(blog)
})

blogRouter.post('/', async (req, res) => {
  const body = req.body

  const users = await User.find({})

  const user = users[0]
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes && body.likes,
    user: user && user._id
  })

  const result = await blog.save()
  if (user) {
    user.blogs = user.blogs.concat(result._id)
    user.save()
  }
  res.status(201).json(result)
})

blogRouter.put('/:id', async (req, res) => {
  const { likes } = req.body
  await Blog.findByIdAndUpdate(req.params.id, { likes: likes })
  res.status(200).end()
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogRouter