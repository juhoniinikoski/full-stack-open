import { screen, render, fireEvent } from '@testing-library/react';
import Blog from '../components/Blog';
import { testBlog, testUser } from './testUtils';

const mockHandleLike = jest.fn();
const mockHandleRemove = jest.fn();

describe('blog component', () => {
  beforeEach(() => {
    render(
      <Blog
        user={testUser}
        blog={testBlog}
        handleLike={mockHandleLike}
        handleRemove={mockHandleRemove}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders initially title ant author but no url or likes', () => {
    expect(screen.getByText('Test blog by Test author')).toBeDefined();
    expect(screen.queryByText('testurl.com/test')).toEqual(null);
    expect(screen.queryByText('likes 0')).toEqual(null);
  });

  it('renders title, author, url and likes if opened', () => {
    expect(screen.getByText('Test blog by Test author')).toBeDefined();
    expect(screen.queryByText('testurl.com/test')).toEqual(null);
    expect(screen.queryByText('likes 0')).toEqual(null);
    expect(screen.queryByText('Test user')).toEqual(null);

    const button = screen.getByText('show');

    fireEvent.click(button);

    expect(screen.getByText('Test blog by Test author')).toBeDefined();
    expect(screen.getByText('testurl.com/test')).toBeDefined();
    expect(screen.getByText('likes 0')).toBeDefined();
    expect(screen.getByText('Test user')).toBeDefined();

    const button2 = screen.getByText('hide');

    fireEvent.click(button2);

    expect(screen.getByText('Test blog by Test author')).toBeDefined();
    expect(screen.queryByText('testurl.com/test')).toEqual(null);
    expect(screen.queryByText('likes 0')).toEqual(null);
    expect(screen.queryByText('Test user')).toEqual(null);
  });

  it('calls handleLike twice when pressing like button twice', () => {
    expect(mockHandleLike).toBeCalledTimes(0);
    const button = screen.getByText('show');
    fireEvent.click(button);

    const likeButton = screen.getByText('like');
    fireEvent.click(likeButton);

    expect(mockHandleLike).toBeCalledTimes(1);

    fireEvent.click(likeButton);
    expect(mockHandleLike).toBeCalledTimes(2);
  });
});
