import anecdoteReducer, {
  initialState as reducedInitial,
} from './anecdoteReducer';
import deepFreeze from 'deep-freeze';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

describe('anecdote reducer', () => {
  const initialState = reducedInitial;

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: '',
    };

    const newState = anecdoteReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('votes an anecdote succesfully', () => {
    const action = {
      type: 'anecdotes/voteAnecdote',
      payload: { id: initialState[0].id },
    };

    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    const [first, ...rest] = initialState;
    expect(newState).toEqual([
      { id: first.id, content: first.content, votes: 1 },
      ...rest,
    ]);
  });

  test('adds a new anecdote', () => {
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: { content: 'test anecdote' },
    };

    const state = initialState;

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState[newState.length - 1].content).toEqual('test anecdote');
    expect(newState[newState.length - 1].votes).toEqual(0);
  });

  test('keeps anecdotes in order from most likes to least likes', () => {
    const action = {
      type: 'anecdotes/voteAnecdote',
      payload: { id: initialState[1].id },
    };

    const action2 = {
      type: 'anecdotes/voteAnecdote',
      payload: { id: initialState[2].id },
    };

    const state = initialState;

    deepFreeze(state);

    const newState = anecdoteReducer(state, action);
    expect(newState[0]).toEqual({ ...initialState[1], votes: 1 });

    const newState2 = anecdoteReducer(newState, action2);
    const newState3 = anecdoteReducer(newState2, action2);

    expect(newState3[0]).toEqual({ ...initialState[2], votes: 2 });
  });
});
