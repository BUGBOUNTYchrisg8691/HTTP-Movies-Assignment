import React, { Component } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const initialFormValues = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default class UpdateForm extends Component {
  state = {
    formValues: initialFormValues,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      ...this.state.formValues,
      stars: ["Actor 1", "Actor 2", "Actor 3"],
    };
    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then((res) => {
        console.log("Post Successful ==>> ", res);
        this.props.setMovieList(res.data);
      })
      .catch((err) => {
        console.log("Post Failure ==>> ", err);
      });
    this.setState({
      formValues: initialFormValues,
    });
    this.props.history.push("/");
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      },
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={this.state.formValues.title}
          onChange={this.handleChange}
        />
        <label htmlFor="title">Director</label>
        <input
          type="text"
          name="director"
          value={this.state.formValues.director}
          onChange={this.handleChange}
        />
        <label htmlFor="title">Metascore</label>
        <input
          type="text"
          name="metascore"
          value={this.state.formValues.metascore}
          onChange={this.handleChange}
        />
        <button>Update Movie</button>
      </form>
    );
  }
}
