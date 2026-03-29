import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCharacterById } from '../../api/dragonballApi';

export const fetchCharacterById = createAsyncThunk(
  'characterDetail/fetchCharacterById',
  async (id) => {
    const data = await getCharacterById(id);
    return data;
  }
);

const characterDetailSlice = createSlice({
  name: 'characterDetail',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCharacterDetail: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCharacterDetail } = characterDetailSlice.actions;
export default characterDetailSlice.reducer;
