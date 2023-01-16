const Blog = require('../models/blog')
const router = require('express').Router()

router.get('/', async (_req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

router.post('/', async (req, res) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes && body.likes
  })

  const result = await blog.save()
  res.status(201).json(result)
})

router.put('/:id', async (req, res) => {
  const { likes } = req.body
  await Blog.findByIdAndUpdate(req.params.id, { likes: likes })
  res.status(200).end()
})

router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = router