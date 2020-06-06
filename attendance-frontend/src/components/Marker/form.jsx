import React from "react";
import { getAllSessions } from "../../scripts/externals";

// import QrReader from "react-qr-reader";
// import InputElement from "../InputElement";

class LoginForm extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.dataFeeder();
  }

  async dataFeeder() {
    const allSessions = await getAllSessions();
  }

  handleChange = (event) => {};

  handleSubmit = (event) => {
    event.preventDefault();
  };

  // function to display login form
  render() {
    return (
      <div className="container">
        <div className="row"></div>
      </div>
    );
  }
}

export default LoginForm;
