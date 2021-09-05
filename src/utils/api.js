import axios from "axios";
import { memoizeSearch } from "./memoize";

const baseUrl = "https://rickandmortyapi.com/api/character";

export const getSearchData = async ({ name, page, nextPageUrl }) => {
  const queryUrl = nextPageUrl || `${baseUrl}/?name=${name}&page=${page || 1}`;
  const searchCachedData = memoizeSearch.cache[queryUrl];
  if(searchCachedData) {
    return searchCachedData;
  }
  try {
    const { data } = await axios.get(queryUrl);
    memoizeSearch.cache[queryUrl] = data;
    return data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    throw new Error(error.response.data.error);
  }
};
