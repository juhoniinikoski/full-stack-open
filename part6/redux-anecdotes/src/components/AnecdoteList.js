import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { createTimedNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) =>
    anecdotes.filter((a) => a.content.includes(filter)),
  );
  const dispatch = useDispatch();

  const handleVote = async (anecdote) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote);
    dispatch(createTimedNotification(`you voted '${anecdote.content}'`));
    dispatch(voteAnecdote(updatedAnecdote));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
