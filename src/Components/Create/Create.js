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
  const navigate = useNavigate();
  const storage = getStorage();
  const date = new Date();

  const handleSubmit = async () => {
    try {

      const timestamp = Date.now();
      const filename = `${timestamp}_${image.name}`;
  
      const storageRef = ref(storage, filename);
  
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
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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
        </form>

        <br />
        {imageUrl && ( // Render image only if imageUrl is available
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={imageUrl}
          ></img>
        )}
        <br />
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          type="file"
        />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
