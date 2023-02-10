export const testUser = {
  id: '63d26131342fdcc85aa109b8',
  name: 'Test user',
  token: 'test_token1234',
  username: 'testuser',
};

export const testBlog = {
  title: 'Test blog',
  author: 'Test author',
  url: 'testurl.com/test',
  likes: 0,
  user: {
    id: testUser.id,
    name: testUser.name,
    username: testUser.username,
  },
};
