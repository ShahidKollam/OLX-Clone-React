import React, { Fragment, useContext, useState } from "react";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/Config";

import "./Create.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const storage = getStorage();
  const date = new Date();

  const handleSubmit = async () => {
    try {
      const formErrors = validate(name, category, price, image);

      if (Object.keys(formErrors).length === 0) {
        // const timestamp = Date.now();
        // const filename = `${timestamp}_${image.name}`;

        const storageRef = ref(storage, image.name);

        const snapshot = await uploadBytes(storageRef, image);
        const URL = await getDownloadURL(snapshot.ref);
        if (URL) {
          setImageUrl(URL);
          const docRef = await addDoc(collection(db, "products"), {
            name,
            category,
            price,
            URL,
            userId: user.uid,
            createdAt: date.toDateString(),
          });
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  const validate = (name, category, price) => {
    const formErrors = {};
    if (name.trim() == "") {
      formErrors.name = "Field is required";
    }

    if (category.trim() == "") {
      formErrors.category = "Field is required";
    }

    if (price.trim() == "") {
      formErrors.price = "Field is required";
    }

    if (!image) {
      formErrors.image = "Upload an Image!";
    }
    setErrors(formErrors);
    return formErrors;
  };
  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="Name"
            defaultValue="John"
          />
          <br />

          {errors.name && <small className="error">{errors.name}</small>}
          <br />

          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            defaultValue="John"
          />
          <br />
          {errors.category && <span className="error">{errors.category}</span>}
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="fname"
            name="Price"
          />
          <br />
          {errors.price && <span className="error">{errors.price}</span>}
          <br />
        </form>

        <br />
        {imageUrl && (
          <img alt="Posts" width="200px" height="200px" src={imageUrl}></img>
        )}
        <br />
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          type="file"
        />
        <br />
        {errors.image && <span className="error">{errors.image}</span>}
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
