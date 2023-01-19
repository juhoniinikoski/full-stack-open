const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 }); // don't want to show all blogs here
  res.json(blogs);
});

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', {
    name: 1,
    username: 1,
  });
  res.json(blog);
});

blogRouter.post('/', async (req, res) => {
  const { body } = req;

  const reqUser = req.user;
  const user = await User.findById(reqUser.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes && body.likes,
    user: user && user._id,
  });

  const result = await blog.save();
  if (user) {
    user.blogs = user.blogs.concat(result._id);
    await user.save();
  }
  res.status(201).json(result);
});

blogRouter.put('/:id', async (req, res) => {
  const { likes } = req.body;
  await Blog.findByIdAndUpdate(req.params.id, { likes });
  res.status(200).end();
});

blogRouter.delete('/:id', async (req, res) => {
  const reqUser = req.user;

  const user = await User.findById(reqUser.id);
  const blog = await Blog.findById(req.params.id);

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).end();
  }
});

module.exports = blogRouter;
