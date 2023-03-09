import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getAnecdotes, voteAnecdote } from './requests';

const App = () => {
  const queryClient = useQueryClient();

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      console.log(anecdote);
      queryClient.setQueryData(
        'anecdotes',
        anecdotes.map((a) => {
          if (a.id === anecdote.id) {
            return anecdote;
          } else return a;
        }),
      );
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
  };

  const {
    data: anecdotes,
    isLoading,
    error,
  } = useQuery('anecdotes', () => getAnecdotes());

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      {isLoading && <p>loading...</p>}
      {error && <p>anecdote service not available due to problems in server</p>}
      {!error &&
        anecdotes &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
