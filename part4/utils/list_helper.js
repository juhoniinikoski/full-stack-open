const lodash = require('lodash');

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  return blogs.map((b) => b.likes).reduce((a, b) => a + b, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((b) => b.likes);
  const maxIdx = likes.indexOf(Math.max(...likes));
  return blogs[maxIdx];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }
  const authors = blogs.map((b) => b.author);
  const occurances = Object.entries(lodash.countBy(authors));
  const nofBlogs = occurances.map((o) => o[1]);
  const maxIdx = nofBlogs.indexOf(Math.max(...nofBlogs));
  return { author: occurances[maxIdx][0], blogs: occurances[maxIdx][1] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }
  const authors = blogs.map((b) => ({ author: b.author, likes: b.likes }));
  const grouped = lodash(authors)
    .groupBy((a) => a.author)
    .map((value, key) => ({
      author: key,
      likes: value.map((v) => v.likes).reduce((a, b) => a + b, 0),
    }))
    .value();

  const likes = grouped.map((g) => g.likes);
  const maxIdx = likes.indexOf(Math.max(...likes));
  return grouped[maxIdx];
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
