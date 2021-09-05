import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchData } from "utils/api";

export const getSearch = createAsyncThunk(
  "/search/get",
  async ({ isNextPage, ...queryObj }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await getSearchData(queryObj);
      return fulfillWithValue({ data, isNextPage });
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
    [getSearch.fulfilled]: (state, action) => {
      const results = action.payload.isNextPage
        ? [...state?.data?.results, ...action.payload.data.results]
        : action.payload.data.results;
      return {
        data: {
          ...action.payload.data,
          results,
        },
        loading: false,
        error: false,
      };
    },
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
