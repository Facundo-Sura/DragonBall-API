const BASE_URL = 'https://dragonball-api.com/api';

export const getCharacters = async (page = 1, limit = 6) => {
  const response = await fetch(`${BASE_URL}/characters?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Error al obtener personajes');
  return response.json();
};

export const getCharacterById = async (id) => {
  const response = await fetch(`${BASE_URL}/characters/${id}`);
  if (!response.ok) throw new Error('Error al obtener personaje');
  return response.json();
};

export const getPlanets = async (page = 1, limit = 6) => {
  const response = await fetch(`${BASE_URL}/planets?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Error al obtener planetas');
  return response.json();
};

export const getPlanetById = async (id) => {
  const response = await fetch(`${BASE_URL}/planets/${id}`);
  if (!response.ok) throw new Error('Error al obtener planeta');
  return response.json();
};

export const getTransformations = async (page = 1, limit = 6) => {
  const response = await fetch(`${BASE_URL}/transformations?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Error al obtener transformaciones');
  return response.json();
};

export const getTransformationById = async (id) => {
  const response = await fetch(`${BASE_URL}/transformations/${id}`);
  if (!response.ok) throw new Error('Error al obtener transformacion');
  return response.json();
};
