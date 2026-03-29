import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCharacters } from '../../api/dragonballApi';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page = 1) => {
    const data = await getCharacters(page, 12);
    return data;
  }
);

export const fetchAllCharacters = createAsyncThunk(
  'characters/fetchAllCharacters',
  async (_, { getState }) => {
    const state = getState();
    const totalPages = state.characters.totalPages || 29;
    const allCharacters = [];
    
    for (let page = 1; page <= totalPages; page++) {
      const data = await getCharacters(page, 12);
      const items = data.items || data;
      allCharacters.push(...items);
    }
    
    return allCharacters;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    items: [],
    allCharacters: [],
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
    clearAllCharacters: (state) => {
      state.allCharacters = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || action.payload;
        state.totalPages = action.payload.meta?.totalPages || action.payload.totalPages || 1;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllCharacters.pending, (state) => {
        state.loadingAll = true;
        state.error = null;
      })
      .addCase(fetchAllCharacters.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.allCharacters = action.payload;
      })
      .addCase(fetchAllCharacters.rejected, (state, action) => {
        state.loadingAll = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage, clearError, clearAllCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
