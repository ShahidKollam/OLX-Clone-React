import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/Config";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const { firebase } = useContext(FirebaseContext);
  const auth = getAuth(firebase);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !phone || !password) {
      setErrorMessage("All fields are required.");
      return;
    }
    
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, { displayName: username });

      const docRef = await addDoc(collection(db, "users"), {
        id: result.user.uid,
        username: username,
        phone: phone,
      });
      console.log("Document written with ID: ", docRef.id);
      navigate("/login");

      console.log("User signed up successfully!");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="170px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <div style={{ height: errorMessage ? '0' : '40px' }}></div>
          {errorMessage && <p className="error">{errorMessage}</p>}

          <button>Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
