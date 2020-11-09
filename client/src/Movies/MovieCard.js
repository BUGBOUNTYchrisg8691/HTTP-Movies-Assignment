import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const MovieCard = (props) => {
  const { title, director, metascore, stars, id } = props.movie;
  const hist = useHistory();

  const handleOnClick = () => {
    hist.push(`/update-movie/${id}`);
  };
  const handleDeleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        hist.push("/");
      })
      .catch((err) => {
        console.log(err);
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
      {hist.location.pathname.includes("movies") ? (
        <button onClick={handleOnClick}>Edit Details</button>
      ) : null}
      {hist.location.pathname.includes("movies") ? (
        <button onClick={handleDeleteMovie}>Delete Movie</button>
      ) : null}
    </div>
  );
};

export default MovieCard;
