import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.concat(anecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const anecdote = { content: content, votes: 0 };
    newAnecdoteMutation.mutate(anecdote);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
