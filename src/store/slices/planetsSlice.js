import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlanets } from '../../api/dragonballApi';

export const fetchPlanets = createAsyncThunk(
  'planets/fetchPlanets',
  async (page = 1) => {
    const data = await getPlanets(page, 12);
    return data;
  }
);

export const fetchAllPlanets = createAsyncThunk(
  'planets/fetchAllPlanets',
  async (_, { getState }) => {
    const state = getState();
    const totalPages = state.planets.totalPages || 20;
    const allPlanets = [];
    
    for (let page = 1; page <= totalPages; page++) {
      const data = await getPlanets(page, 12);
      const items = data.items || data;
      allPlanets.push(...items);
    }
    
    return allPlanets;
  }
);

const planetsSlice = createSlice({
  name: 'planets',
  initialState: {
    items: [],
    allPlanets: [],
    loading: false,
    loadingAll: false,
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
    clearAllPlanets: (state) => {
      state.allPlanets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || action.payload;
        state.totalPages = action.payload.meta?.totalPages || action.payload.totalPages || 1;
      })
      .addCase(fetchPlanets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllPlanets.pending, (state) => {
        state.loadingAll = true;
        state.error = null;
      })
      .addCase(fetchAllPlanets.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.allPlanets = action.payload;
      })
      .addCase(fetchAllPlanets.rejected, (state, action) => {
        state.loadingAll = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, clearError, clearAllPlanets } = planetsSlice.actions;
export default planetsSlice.reducer;
