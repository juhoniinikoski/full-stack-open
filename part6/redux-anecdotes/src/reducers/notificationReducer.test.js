import notificationReducer from './notificationReducer';
import deepFreeze from 'deep-freeze';

describe('notification reducer', () => {
  test('adds a notification message', () => {
    const action = {
      type: 'notification/createNotification',
      payload: 'test notification',
    };

    const state = '';
    deepFreeze(state);
    const newState = notificationReducer(state, action);

    expect(newState).toEqual('test notification');

    const action2 = {
      type: 'notification/createNotification',
      payload: 'test notification again',
    };

    deepFreeze(newState);
    const newState2 = notificationReducer(newState, action2);

    expect(newState2).toEqual('test notification again');
  });

  test('clears the notification', () => {
    const action = {
      type: 'notification/clearNotification',
    };

    const state = 'test';
    deepFreeze(state);

    const newState = notificationReducer(state, action);
    expect(newState).toEqual('');
  });
});
