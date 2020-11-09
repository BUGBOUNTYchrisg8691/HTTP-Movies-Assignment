import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialFormValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default function EditMovie() {
  const hist = useHistory();
  const { id } = useParams();
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setFormValues({
          id: res.data.id,
          title: res.data.title,
          director: res.data.director,
          metascore: res.data.metascore,
          stars: res.data.stars,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setFormValues(initialFormValues);
    hist.push(`/movies/${id}`);
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
      <button>Submit Changes</button>
    </form>
  );
}
