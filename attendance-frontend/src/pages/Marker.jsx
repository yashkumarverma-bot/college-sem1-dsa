import React from "react";

// importing components
import NavBar from "../components/navbar";
import MainMast from "../components/Marker/mainMast";
import Form from "../components/Marker/form";

const LandingPage = () => (
  <div>
    <NavBar isLoggedIn={false} />
    <MainMast />
    <Form />
  </div>
);

export default LandingPage;
