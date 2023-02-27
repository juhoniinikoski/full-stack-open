import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { createTimedNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) =>
    anecdotes.filter((a) => a.content.includes(filter)),
  );
  const dispatch = useDispatch();

  const handleVote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(createTimedNotification(`you voted '${anecdote.content}'`));
    dispatch(voteAnecdote(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
