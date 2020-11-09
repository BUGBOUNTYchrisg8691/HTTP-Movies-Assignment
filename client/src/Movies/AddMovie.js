import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { v4 as uuid } from "uuid";

const initialFormValues = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

export default function AddMovie() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const hist = useHistory();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      ...formValues,
      id: uuid(),
      stars: formValues.stars.split(", "),
    };
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then((res) => {
        console.log("Post successful ===> ", res);
      })
      .catch((err) => {
        console.log(err);
      });
    hist.push("/");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={formValues.title}
        onChange={handleOnChange}
      />
      <label htmlFor="director">Director</label>
      <input
        type="text"
        name="director"
        value={formValues.director}
        onChange={handleOnChange}
      />
      <label htmlFor="metascore">MetaScore</label>
      <input
        type="text"
        name="metascore"
        value={formValues.metascore}
        onChange={handleOnChange}
      />
      <label htmlFor="stars">Stars</label>
      <textarea
        type="text"
        name="stars"
        value={formValues.stars}
        onChange={handleOnChange}
      />
      <button>Add Movie</button>
    </form>
  );
}
