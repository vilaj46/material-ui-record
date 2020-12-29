import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

ReactDOM.render(<App />, document.getElementById("root"));

/**
 * Errors do not persist on modal close.
 * After hitting ok or cancel remove all the state.
 * If we close the modal remove the state.
 */
