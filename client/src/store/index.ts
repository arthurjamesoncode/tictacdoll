import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import userReducer from './slices/userSlice';
import popupReducer from './slices/popupSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
    popup: popupReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
