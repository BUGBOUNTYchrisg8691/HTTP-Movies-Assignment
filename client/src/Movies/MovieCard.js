import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const MovieCard = (props) => {
  const { title, director, metascore, stars, id } = props.movie;
  const { push } = useHistory();

  const handleDeleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("Delete Success ==>> ", res);
        props.setMovieList(
          props.movies.filter((movie) => movie.id !== Number(id))
        );
      })
      .catch((err) => {
        console.log("Delete Failure ==>> ", err.response);
      });
  };

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map((star) => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          push(`/update-movie/${id}`);
        }}
      >
        Edit Movie
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDeleteMovie(e);
          push("/");
        }}
      >
        Delete Movie
      </button>
    </div>
  );
};

export default MovieCard;
