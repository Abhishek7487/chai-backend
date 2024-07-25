import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .post("api/v1/users/login", {
        username: "abhishekpatil",
        password: "abhishek@7487",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  return (
    <>
      <h1>Youtube</h1>
    </>
  );
}

export default App;
