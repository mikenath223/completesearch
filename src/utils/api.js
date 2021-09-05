import axios from 'axios';

const baseUrl = "https://rickandmortyapi.com/api/character"

export const getSearchData = async ({name, page, nextPageUrl}) => {
  const queryUrl = nextPageUrl || `${baseUrl}/?name=${name}&page=${page || 1}`
  try {
    const { data } = await axios.get(queryUrl);
    return data
  } catch (error) {
    if(!error.response) {
      throw error
    }
    throw new Error(error.response.data.error)
  }
}
