import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlanetById } from '../../api/dragonballApi';

export const fetchPlanetById = createAsyncThunk(
  'planetDetail/fetchPlanetById',
  async (id) => {
    const data = await getPlanetById(id);
    return data;
  }
);

const planetDetailSlice = createSlice({
  name: 'planetDetail',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPlanetDetail: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanetById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPlanetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearPlanetDetail } = planetDetailSlice.actions;
export default planetDetailSlice.reducer;
