import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import View from "./Pages/ViewPost";
import Create from "./Pages/Create";

import "./App.css";
import { AuthContext, FirebaseContext } from "./store/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from "./store/PostContext";

const auth = getAuth();

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("User", user);
      } else {
        console.log("User is signed out");
      }
    });
  });

  return (
    <div>
      <Post>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
