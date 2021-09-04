import axios from 'axios';

const adapter = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character"
})

export const getSearchData = async (name, page=1) => {
  try {
    const { data } = await adapter.get(`?name=${name}&page=${page}`);
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}
