import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./components/NavBar.jsx";
import DatePicker from "./components/datePicker.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar />
        <DatePicker />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
