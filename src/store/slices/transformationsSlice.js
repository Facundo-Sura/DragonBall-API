import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTransformations } from '../../api/dragonballApi';

export const fetchTransformations = createAsyncThunk(
  'transformations/fetchTransformations',
  async (page = 1) => {
    const data = await getTransformations(page, 12);
    return data;
  }
);

const transformationsSlice = createSlice({
  name: 'transformations',
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransformations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransformations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || action.payload;
        state.totalPages = action.payload.meta?.totalPages || action.payload.totalPages || 1;
      })
      .addCase(fetchTransformations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, clearError } = transformationsSlice.actions;
export default transformationsSlice.reducer;
