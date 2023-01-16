const Blog = require('../models/blog')
const router = require('express').Router()

router.get('/', (_request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(e => next(e))
})

router.post('/', (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(e => next(e))
})

module.exports = router