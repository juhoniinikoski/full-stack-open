import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdotes(state, action) {
      return state
        .map((s) => (s.id === action.payload.id ? action.payload : { ...s }))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    anecdotes.forEach((anecdote) => {
      dispatch(appendAnecdote(anecdote));
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (content) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(content);
    dispatch(updateAnecdotes(updatedAnecdote));
  };
};

export const { updateAnecdotes, appendAnecdote } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
