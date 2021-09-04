import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSearchData } from 'utils/api';

export const getSearch = createAsyncThunk('/search/get',
	async ({ name, page }, { rejectWithValue }) => {
		try {
			return await getSearchData(name, page)
		} catch (error) {
			return rejectWithValue("Searched name doesn't exist")
		}
	});

const initialState = {
	loading: true,
	data: {},
	displayData: [],
	error: false
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		displayNextResult: (state, action) => {
			const { data: { results }, displayData } = state;
			const { start, end } = action;
			return {
				...state,
				displayData: [...displayData, ...results.slice(start, end)]
			}
		},
	},
	extraReducers: {
		[getSearch.fulfilled]: (state, action) => ({
			...state,
			data: action.payload,
			displayData: action.payload?.slice(0, 10),
			loading: false
		}),
		[getSearch.loading]: (state) => ({
			...state,
			loading: false
		}),
		[getSearch.rejected]: (state, action) => ({
			...state,
			loading: false,
			error: action.payload
		})
	},
});

export const { displayNextResult } = searchSlice.actions;

export default searchSlice.reducer;
