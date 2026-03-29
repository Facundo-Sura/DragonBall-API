import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/charactersSlice';
import planetsReducer from './slices/planetsSlice';
import transformationsReducer from './slices/transformationsSlice';
import characterDetailReducer from './slices/characterDetailSlice';
import planetDetailReducer from './slices/planetDetailSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    planets: planetsReducer,
    transformations: transformationsReducer,
    characterDetail: characterDetailReducer,
    planetDetail: planetDetailReducer,
  },
});
