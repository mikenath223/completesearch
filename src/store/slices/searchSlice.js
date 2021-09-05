import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchData } from "utils/api";

export const getSearch = createAsyncThunk(
  "/search/get",
  async (queryObj, { rejectWithValue }) => {
    try {
      return await getSearchData(queryObj);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: true,
  data: {},
  error: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: {
    [getSearch.fulfilled]: (state, action) => ({
      data: {
        ...action.payload,
        results: [...(state?.data?.results || []), ...action.payload.results],
      },
      loading: false,
      error: false,
    }),
    [getSearch.loading]: (state) => ({
      ...state,
      error: false,
      loading: false,
    }),
    [getSearch.rejected]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

export default searchSlice.reducer;
