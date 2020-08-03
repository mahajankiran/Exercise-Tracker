import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = (props) => {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );
};

export default class ExerciseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
    };
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Error" + err);
      });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }
  render() {
    return (
      <>
        <div>
          <h3>Logged Exercises</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.exerciseList()}</tbody>
          </table>
        </div>
      </>
    );
  }
}
