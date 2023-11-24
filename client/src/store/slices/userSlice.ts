import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginPayload } from '../../utils/payloadTypes';

const initialState: { id?: string; username?: string; isAuthenticated: boolean } = {
  id: undefined,
  username: undefined,
  isAuthenticated: false,
};

//kinda overkill but could be useful when expanding
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginPayload>) => {
      state.id = payload.id;
      state.username = payload.username;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.username = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
