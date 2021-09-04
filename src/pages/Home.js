import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSearch, displayNextResult } from 'store/slices/searchSlice';

export default function Home () {
  const searchResult = useSelector(state => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearch({ name: "ricky"}))
  }, [dispatch])

  return <div>
    {JSON.stringify(searchResult)}
  </div>
};