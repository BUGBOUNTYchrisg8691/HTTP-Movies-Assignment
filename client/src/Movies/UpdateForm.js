import React, { Component } from "react";
import axios from "axios";

const initialFormValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default class UpdateForm extends Component {
  state = {
    formValues: initialFormValues,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then((res) => {
        console.log("Get Successful ==>> ", res);
        this.setState({
          formValues: res.data,
        });
      })
      .catch((err) => {
        console.log("Get Failure ==>> ", err);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/movies/${this.props.match.params.id}`,
        this.state.formValues
      )
      .then((res) => {
        console.log("Put Successful ==>> ", res);
        this.props.setMovieList(
          this.props.movieList.map((movie) => {
            if (movie.id === Number(this.props.match.params.id)) {
              return this.state.formValues;
            }
            return movie;
          })
        );
      })
      .catch((err) => {
        console.log("Put Failure ==>> ", err);
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
