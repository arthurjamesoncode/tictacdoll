import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { popupPayload } from '../../utils/payloadTypes';

const initialState: { showPopup: boolean, popupMessage: string } = {
  showPopup: false,
  popupMessage: ''
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    show: (state, { payload }: PayloadAction<popupPayload> ) => {
      state.showPopup = true;
      state.popupMessage = payload.message
    },

    hide: (state) => {
      state.showPopup = false;
      state.popupMessage = '';
    }
  }
});

export const { show, hide } = popupSlice.actions;

export default popupSlice.reducer;

