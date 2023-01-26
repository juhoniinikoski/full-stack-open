import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import { setToken, getAll, create, update } from './services/blogs';
import { login } from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const formRef = useRef();

  const handleLogin = async (username, password) => {
    try {
      const user = await login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setToken(user.token);
      setUser(user);
    } catch (error) {
      setMessage('wrong credentials');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem('loggedUser');
  };

  const handleCreate = async newBlog => {
    try {
      const response = await create(newBlog);
      setBlogs([...blogs, { ...response, user: user }]);

      setMessage(`a new blog ${response.title} by ${response.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage(error.response.data.error);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  const handleLike = async newBlog => {
    try {
      const blogObject = {
        user: newBlog.user,
        likes: newBlog.likes,
        author: newBlog.author,
        title: newBlog.title,
        url: newBlog.url,
      };
      await update(newBlog.id, blogObject);
      const newBlogs = blogs;
      setBlogs(
        newBlogs.map(b => {
          if (b.id === newBlog.id) {
            return { ...b, likes: b.likes + 1 };
          } else {
            return b;
          }
        }),
      );
    } catch (error) {
      setMessage(error.response.data.error);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  useEffect(() => {
    getAll().then(blogs => setBlogs(blogs));

    const storageUser = window.localStorage.getItem('loggedUser');
    if (storageUser) {
      setUser(JSON.parse(storageUser));
      setToken(JSON.parse(storageUser).token);
    }
  }, []);

  if (!user) {
    return (
      <div>
        {message && <p>{message}</p>}
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      {message && <p>{message}</p>}
      <h2>blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button onClick={handleLogout} type="button">
          log out
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={formRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      ))}
    </div>
  );
};

export default App;
