import { initialState as reducedInitial } from './anecdoteReducer';
import filterReducer from './filterReducer';
import deepFreeze from 'deep-freeze';

describe('filter reducer', () => {
  const initialState = reducedInitial;

  test('sets filter correctly', () => {
    const action = {
      type: 'SET_FILTER',
      payload: 'firs',
    };

    const state = initialState;
    deepFreeze(state);
    const newState = filterReducer(state, action);

    expect(newState).toEqual('firs');

    const action2 = {
      type: 'SET_FILTER',
      payload: '',
    };

    deepFreeze(newState);
    const newState2 = filterReducer(newState, action2);

    expect(newState2).toEqual('');
  });
});
