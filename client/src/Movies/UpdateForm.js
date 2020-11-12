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
          formValues: {
            ...res.data,
            stars: res.data.stars.join(", "),
          },
        });
      })
      .catch((err) => {
        console.log("Get Failure ==>> ", err);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovie = {
      ...this.state.formValues,
      stars: this.state.formValues.stars.split(", "),
    };
    axios
      .put(
        `http://localhost:5000/api/movies/${this.props.match.params.id}`,
        updatedMovie
      )
      .then((res) => {
        console.log("Put Successful ==>> ", res);
        this.props.setMovieList(
          this.props.movieList.map((movie) => {
            if (movie.id === Number(this.props.match.params.id)) {
              return updatedMovie;
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
        <label htmlFor="director">Director</label>
        <input
          type="text"
          name="director"
          value={this.state.formValues.director}
          onChange={this.handleChange}
        />
        <label htmlFor="metascore">Metascore</label>
        <input
          type="text"
          name="metascore"
          value={this.state.formValues.metascore}
          onChange={this.handleChange}
        />
        <label htmlFor="star">Stars</label>
        <input
          type="textarea"
          name="stars"
          value={this.state.formValues.stars}
          onChange={this.handleChange}
        />
        <button>Update Movie</button>
      </form>
    );
  }
}
