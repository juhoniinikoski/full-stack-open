const mongodb = require('mongodb');
const Blog = require('../models/blog');
const User = require('../models/user');

const blogsInDb = async () => await Blog.find({});
const usersInDb = async () => await User.find({});

const blog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: new mongodb.ObjectId('63c9019f756a847e6f414e60'),
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: new mongodb.ObjectId('63c9019f756a847e6f414e61'),
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const users = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    passwordHash: '$2b$10$ARKTKsu66hjd7m5LOfkPveYZSRlrJPgzuc0DTYA32CXvnSVyW5BPG',
    _id: new mongodb.ObjectId('63c9019f756a847e6f414e60'),
  },
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    passwordHash: '$2b$10$ARKTKsu66hjd7m5LOfkPveYZSRlrJPgzuc0DTYA32CXvnSVyW5BPG',
    _id: new mongodb.ObjectId('63c9019f756a847e6f414e61'),
  },
];

const getToken = async (api) => {
  const loginData = {
    username: 'hellas',
    password: 'password',
  };

  const response = await api.post('/api/login').send(loginData);

  return response.body.token;
};

module.exports = {
  blog,
  blogs,
  blogsInDb,
  usersInDb,
  users,
  getToken,
};
