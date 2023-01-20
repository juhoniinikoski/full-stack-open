import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { setToken, getAll, create } from './services/blogs'
import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const handleLogout = async () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleCreate = async event => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      const response = await create(newBlog)
      setBlogs([...blogs, response])
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (exception) {
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs( blogs )
    )

    const storageUser = window.localStorage.getItem('loggedUser')
    if (storageUser) {
      setUser(JSON.parse(storageUser))
      setToken(JSON.parse(storageUser).token)
    }

  }, [])

  if (!user) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {message && <p>{message}</p>}
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout} type='button'>log out</button></p>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
