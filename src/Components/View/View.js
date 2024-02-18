import React, { useContext, useEffect, useState } from "react";

import "./View.css";

import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../firebase/Config";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/Context";

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  console.log("postDetailsss", postDetails);

  useEffect(() => {
    const fetchData = async () => {
      if (postDetails) {
        const { userId } = postDetails;
        const q = query(collection(db, "users"), where("id", "==", userId));

        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
            console.log(doc.id, " => ", doc.data());
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchData();
  }, [postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.URL} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.category}</span>
          <p>Two Wheeler</p>
          <span>{postDetails?.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
