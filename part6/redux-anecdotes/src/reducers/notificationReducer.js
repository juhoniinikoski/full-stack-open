import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    clearNotification() {
      return '';
    },
    createNotification(_state, action) {
      setTimeout(() => {
        return '';
      }, 1000);
      return action.payload;
    },
  },
});

export const createTimedNotification = (payload) => {
  // called inside dispatch
  return async (dispatch) => {
    dispatch(createNotification(payload));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };
};

export const { createNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
