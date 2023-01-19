const mongoose = require('mongoose');
const supertest = require('supertest');
const testHelpers = require('./test_helpers');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(testHelpers.users);
});

afterAll(() => {
  mongoose.connection.close();
});

describe('testing users', () => {
  it('creates a user succesfully', async () => {
    const initial = await testHelpers.usersInDb();

    const newUser = {
      name: 'Test user',
      username: 'testuser',
      password: 'testuserpassword',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('content-Type', /application\/json/);

    const result = await testHelpers.usersInDb();

    expect(result.length).toEqual(initial.length + 1);
  });

  it('throws an error if trying to create a user with too short password', async () => {
    const initial = await testHelpers.usersInDb();

    const newUser = {
      name: 'Test user',
      username: 'testuser',
      password: 'te',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const result = await testHelpers.usersInDb();

    expect(result.length).toEqual(initial.length);
  });

  it('throws an error if trying to create a user with too short username', async () => {
    const initial = await testHelpers.usersInDb();

    const newUser = {
      name: 'Test user',
      username: 'te',
      password: 'testuserpassword',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const result = await testHelpers.usersInDb();

    expect(result.length).toEqual(initial.length);
  });

  it('throws an error if trying to create a user with username which is already taken', async () => {
    const initial = await testHelpers.usersInDb();

    const newUser = {
      name: 'Test user',
      username: 'hellas',
      password: 'testuserpassword',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const result = await testHelpers.usersInDb();

    expect(result.length).toEqual(initial.length);
  });
});
