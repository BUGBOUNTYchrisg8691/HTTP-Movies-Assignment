import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import MovieCard from "./MovieCard";

function Movie({ movieList, setMovieList, addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("Get Success ==>> ", res);
        setMovie(res.data);
      })
      .catch((err) => console.log("Get Failure ==>> ", err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movies={movieList} setMovieList={setMovieList} movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
