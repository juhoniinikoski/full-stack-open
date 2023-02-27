import filterReducer from './filterReducer';
import deepFreeze from 'deep-freeze';

describe('filter reducer', () => {
  test('sets filter correctly', () => {
    const action = {
      type: 'filter/filterChange',
      payload: 'firs',
    };

    const state = '';
    deepFreeze(state);
    const newState = filterReducer(state, action);

    expect(newState).toEqual('firs');

    const action2 = {
      type: 'filter/filterChange',
      payload: '',
    };

    deepFreeze(newState);
    const newState2 = filterReducer(newState, action2);

    expect(newState2).toEqual('');
  });
});
