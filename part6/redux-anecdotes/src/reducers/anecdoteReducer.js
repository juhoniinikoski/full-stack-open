import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const initialState = anecdotesAtStart.map(asObject);

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push({ content: action.payload.content, votes: 0, id: getId() });
    },
    voteAnecdote(state, action) {
      return state
        .map((s) =>
          s.id === action.payload.id ? { ...s, votes: s.votes + 1 } : { ...s },
        )
        .sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { createAnecdote, voteAnecdote } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
