import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import Context, { FirebaseContext } from "./store/Context";
import firebase from "./firebase/Config";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
