import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import AddForm from "./Movies/AddForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        console.log("Get Success ==>> ", res);
        setMovieList(res.data);
      })
      .catch((err) => console.log("Get Failure ==>> ", err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie
          movieList={movieList}
          setMovieList={setMovieList}
          addToSavedList={addToSavedList}
        />
      </Route>

      <Route
        path="/update-movie/:id"
        render={(props) => (
          <UpdateForm
            {...props}
            movieList={movieList}
            setMovieList={setMovieList}
          />
        )}
      />

      <Route
        path="/add-movie"
        render={(props) => (
          <AddForm
            {...props}
            movieList={movieList}
            setMovieList={setMovieList}
          />
        )}
      />
    </>
  );
};

export default App;
