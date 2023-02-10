import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import BlogForm from '../components/BlogForm';

const mockHandleCreate = jest.fn();

describe('blog form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits a form with correct values', async () => {
    const { container } = render(<BlogForm handleCreate={mockHandleCreate} />);
    const titleInput = container.querySelector('#title-input');
    const authorInput = container.querySelector('#author-input');
    const urlInput = container.querySelector('#url-input');

    const submitButton = screen.getByText('create');

    fireEvent.change(titleInput, {
      target: { value: 'title from a test case' },
    });

    fireEvent.change(authorInput, {
      target: { value: 'Test author' },
    });

    fireEvent.change(urlInput, {
      target: { value: 'testurl.com/testcase' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleCreate).toBeCalledWith({
        author: 'Test author',
        title: 'title from a test case',
        url: 'testurl.com/testcase',
      });
    });
  });
});
