import { useState } from 'react';

const Blog = ({ blog, handleLike }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        padding: 16,
        marginTop: 16,
      }}
    >
      <div>
        {blog.title} by {blog.author}
        <button style={{ marginLeft: 8 }} onClick={() => setOpen(!open)}>
          {open ? 'hide' : 'show'}
        </button>
      </div>
      {open && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button
              style={{ marginLeft: 8 }}
              onClick={() =>
                handleLike({
                  ...blog,
                  likes: blog.likes + 1,
                  user: blog.user.id,
                })
              }
            >
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
